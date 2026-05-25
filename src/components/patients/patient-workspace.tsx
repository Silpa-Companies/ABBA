/**
 * @file        patient-workspace.tsx
 * @description Patient Workspace container with a sticky header and tab selection interface.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  Edit2Icon,
  SendIcon,
  DownloadIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import { WorkspaceIntakeTab } from "./workspace-intake-tab"
import { WorkspaceMatchingTab } from "./workspace-matching-tab"
import { WorkspaceRecommendationsTab } from "./workspace-recommendations-tab"
import type { PatientRecord, ClinicianRecord } from "@/lib/data/mock-data"

export interface PatientWorkspaceProps {
  /** Active selected patient record details */
  patient: PatientRecord
  /** Master list of clinicians for matching search */
  clinicians: ClinicianRecord[]
  /** Triggered to return back to Patient Hub list */
  onBack: () => void
  /** Triggered when the intake form should open for editing */
  onEditIntake: () => void
  /** Triggered when clinician recommendation list changes */
  onUpdateRecommendations: (clinicianIds: string[]) => void
  /** Triggered when a patient record changes (e.g. status transition to Matched) */
  onUpdatePatient: (updatedPatient: PatientRecord) => void
  /** Current list of shortlisted recommended clinician IDs for this patient */
  recommendedIds: string[]
}

/**
 * Main Patient Workspace component.
 * Integrates sticky identity header and Tabbed pages.
 * 
 * @param props - Workspace actions and record bounds
 * @returns React node
 */
export function PatientWorkspace({
  patient,
  clinicians,
  onBack,
  onEditIntake,
  onUpdateRecommendations,
  onUpdatePatient,
  recommendedIds,
}: PatientWorkspaceProps) {
  const [activeTab, setActiveTab] = React.useState("intake")
  const [isSending, setIsSending] = React.useState(false)
  const [sentSuccess, setSentSuccess] = React.useState(false)

  // Safely extract patient name initials
  const firstNameChar = patient.intakeData.legalFirstName ? patient.intakeData.legalFirstName[0] : ""
  const lastNameChar = patient.intakeData.legalLastName ? patient.intakeData.legalLastName[0] : ""
  const initials = `${firstNameChar}${lastNameChar}` || "PT"

  const getStatusBadgeVariant = (status: PatientRecord["status"]) => {
    if (status === "Active") return "success"
    if (status === "Under Review") return "warning"
    if (status === "Matched") return "default"
    return "secondary"
  }

  // Handle action click "Send to Patient"
  const handleSendToPatient = () => {
    setIsSending(true)

    // Simple mock network trigger delay
    setTimeout(() => {
      setIsSending(false)
      setSentSuccess(true)

      const updated: PatientRecord = {
        ...patient,
        status: "Matched",
        lastUpdated: new Date().toISOString(),
      }
      onUpdatePatient(updated)

      setTimeout(() => {
        setSentSuccess(false)
      }, 2500)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Back button link */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-fit gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Patient Hub
      </button>

      {/* Sticky patient identity header */}
      <div className="sticky top-[var(--spacing-16)] z-30 bg-background/95 backdrop-blur-md border border-[var(--color-border)] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar fallback={initials} size="lg" className="bg-[var(--color-primary-600)] text-primary-foreground font-black" />
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-foreground leading-tight">
                {patient.name}
              </h2>
              <Badge variant={getStatusBadgeVariant(patient.status)}>
                {patient.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div>ID: <span className="font-mono font-medium text-foreground">{patient.id}</span></div>
              <div>DOB: <span className="font-medium text-foreground">{patient.dob}</span></div>
              <div>Clinician: <span className="font-medium text-foreground">{patient.assignedClinician}</span></div>
              <div>Loc: <span className="font-medium text-foreground">{patient.intakeData.zipCode || "Telehealth"}</span></div>
            </div>
          </div>
        </div>

        {/* Header CTA action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEditIntake}>
            <Edit2Icon className="h-3.5 w-3.5 mr-1" />
            Edit Profile
          </Button>
          <Button
            variant={sentSuccess ? "outline" : "default"}
            size="sm"
            onClick={handleSendToPatient}
            disabled={isSending || recommendedIds.length === 0}
            className={cn(sentSuccess && "border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400")}
          >
            <SendIcon className="h-3.5 w-3.5 mr-1" />
            {isSending ? "Sending..." : sentSuccess ? "Sent!" : "Send to Patient"}
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="intake">Overview/Intake</TabsTrigger>
          <TabsTrigger value="matching" count={clinicians.length}>Matching</TabsTrigger>
          <TabsTrigger value="recommendations" count={recommendedIds.length}>
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intake">
          <WorkspaceIntakeTab
            patient={patient}
            onEditIntake={onEditIntake}
            onUpdatePatient={onUpdatePatient}
          />
        </TabsContent>

        <TabsContent value="matching">
          <WorkspaceMatchingTab
            patient={patient}
            clinicians={clinicians}
            recommendedIds={recommendedIds}
            onUpdateRecommendations={onUpdateRecommendations}
          />
        </TabsContent>

        <TabsContent value="recommendations">
          <WorkspaceRecommendationsTab
            patient={patient}
            clinicians={clinicians}
            recommendedIds={recommendedIds}
            onUpdateRecommendations={onUpdateRecommendations}
            onSendToPatient={handleSendToPatient}
            isSending={isSending}
            sentSuccess={sentSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

