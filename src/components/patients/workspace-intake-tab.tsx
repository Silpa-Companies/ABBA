/**
 * @file        workspace-intake-tab.tsx
 * @description Tab panel containing patient demographics, clinical history cards, and intake progress checklist.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  FileTextIcon,
  HeartPulseIcon,
  UserIcon,
  ClipboardCheckIcon,
  MinusCircleIcon,
  CircleIcon,
  CheckIcon,
} from "lucide-react"
import type { PatientRecord } from "@/lib/data/mock-data"

export interface WorkspaceIntakeTabProps {
  /** Selected patient record */
  patient: PatientRecord
  /** Triggered to open editing intake modal */
  onEditIntake: () => void
  /** Triggered when patient details change (e.g. inline edit goals summary) */
  onUpdatePatient: (updatedPatient: PatientRecord) => void
}

/**
 * Intake Tab content area inside Patient Workspace.
 * Simplified React layout calculating metrics directly in render.
 * 
 * @param props - Intake tab props
 * @returns React node
 */
export function WorkspaceIntakeTab({
  patient,
  onEditIntake,
  onUpdatePatient,
}: WorkspaceIntakeTabProps) {
  const { intakeData } = patient

  // Inline edit state for Goals summary text
  const [isEditingGoals, setIsEditingGoals] = React.useState(false)
  const [goalsText, setGoalsText] = React.useState(intakeData.treatmentGoals || "")

  // Calculate scores directly
  const gad7Answered = (intakeData.gad7Answers || []).filter((v) => v !== null && v !== undefined)
  const gad7Total = gad7Answered.length === 0 ? null : gad7Answered.reduce((a, b) => a + b, 0)

  const phq9Answered = (intakeData.phq9Answers || []).filter((v) => v !== null && v !== undefined)
  const phq9Total = phq9Answered.length === 0 ? null : phq9Answered.reduce((a, b) => a + b, 0)

  const getGad7Severity = (score: number) => {
    if (score >= 15) return "Severe Anxiety"
    if (score >= 10) return "Moderate Anxiety"
    if (score >= 5) return "Mild Anxiety"
    return "Minimal Anxiety"
  }

  const getPhq9Severity = (score: number) => {
    if (score >= 20) return "Severe Depression"
    if (score >= 15) return "Moderately Severe Depression"
    if (score >= 10) return "Moderate Depression"
    if (score >= 5) return "Mild Depression"
    return "Minimal/No Depression"
  }

  // Calculate checklist directly
  const checklistItems = [
    {
      label: "Demographics",
      status: intakeData.legalFirstName && intakeData.dateOfBirth ? "Complete" : "Pending",
    },
    {
      label: "Clinical Profile / History",
      status: intakeData.chiefComplaint || intakeData.priorTherapyDetails ? "Complete" : "In Progress",
    },
    {
      label: "Standardized Screenings",
      status: gad7Total !== null && phq9Total !== null ? "Complete" : "Pending",
    },
    {
      label: "Modality & Availability Preferences",
      status: (intakeData.languages || []).length > 0 && Object.keys(intakeData.availability || {}).length > 0 ? "Complete" : "In Progress",
    },
    {
      label: "Insurance Provider Verification",
      status: intakeData.insuranceProvider && intakeData.insuranceMemberId ? "Complete" : "Pending",
    },
  ]

  const completedCount = checklistItems.filter((i) => i.status === "Complete").length
  const completionPercentage = Math.round((completedCount / checklistItems.length) * 100)

  // Save inline goals edits
  const handleSaveGoals = () => {
    setIsEditingGoals(false)
    onUpdatePatient({
      ...patient,
      intakeData: {
        ...intakeData,
        treatmentGoals: goalsText,
      },
      lastUpdated: new Date().toISOString(),
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Goals & Preferences Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Goals & Preferences</CardTitle>
              </div>
              {!isEditingGoals && (
                <button
                  type="button"
                  onClick={() => setIsEditingGoals(true)}
                  className="text-xs text-[var(--color-primary-600)] hover:underline font-semibold cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditingGoals ? (
              <div className="space-y-2">
                <Textarea
                  value={goalsText}
                  onChange={(e) => setGoalsText(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="xs" onClick={handleSaveGoals}>
                    Save
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      setGoalsText(intakeData.treatmentGoals || "")
                      setIsEditingGoals(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground leading-relaxed">
                {intakeData.treatmentGoals || "No treatment goal summary entered yet."}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)]">
              {(intakeData.presentingIssues || []).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {(intakeData.goalAreas || []).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              {intakeData.modality && <Badge variant="default">{intakeData.modality}</Badge>}
            </div>
          </CardContent>
        </Card>

        {/* Screening Results Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardCheckIcon className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Screening Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GAD-7 anxiety scoring */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>GAD-7 (Anxiety Severity)</span>
                  <span className="font-bold">
                    {gad7Total === null ? "Not Screened" : `${gad7Total} / 21`}
                  </span>
                </div>
                <Progress value={gad7Total || 0} max={21} variant="bar" />
                {gad7Total !== null && (
                  <div className="flex items-center justify-between text-xs mt-1 text-muted-foreground">
                    <span>Clinical Interpretation:</span>
                    <Badge variant={gad7Total >= 10 ? "danger" : "secondary"}>
                      {getGad7Severity(gad7Total)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* PHQ-9 depression scoring */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>PHQ-9 (Depression Severity)</span>
                  <span className="font-bold">
                    {phq9Total === null ? "Not Screened" : `${phq9Total} / 27`}
                  </span>
                </div>
                <Progress value={phq9Total || 0} max={27} variant="bar" />
                {phq9Total !== null && (
                  <div className="flex items-center justify-between text-xs mt-1 text-muted-foreground">
                    <span>Clinical Interpretation:</span>
                    <Badge variant={phq9Total >= 10 ? "danger" : "secondary"}>
                      {getPhq9Severity(phq9Total)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical History Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HeartPulseIcon className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Medical History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="flex border-b pb-2.5 last:border-0 last:pb-0 items-start gap-4 text-xs">
              <span className="font-semibold text-muted-foreground w-32">Current Diagnoses</span>
              <div className="flex flex-wrap gap-1.5">
                {(intakeData.presentingIssues || []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="h-5">
                    {tag}
                  </Badge>
                ))}
                {(intakeData.presentingIssues || []).length === 0 && <span className="text-muted-foreground">None noted</span>}
              </div>
            </div>

            <div className="flex border-b pb-2.5 last:border-0 last:pb-0 items-start gap-4 text-xs">
              <span className="font-semibold text-muted-foreground w-32">Medications</span>
              <span className="text-foreground">{intakeData.currentMedications || "None"}</span>
            </div>

            <div className="flex border-b pb-2.5 last:border-0 last:pb-0 items-start gap-4 text-xs">
              <span className="font-semibold text-muted-foreground w-32">Prior Therapy</span>
              <span className="text-foreground">
                {intakeData.priorTherapy
                  ? `Yes: ${intakeData.priorTherapyDetails}`
                  : "No prior mental health counseling record"}
              </span>
            </div>

            <div className="flex border-b pb-2.5 last:border-0 last:pb-0 items-start gap-4 text-xs">
              <span className="font-semibold text-muted-foreground w-32">Medical History</span>
              <span className="text-foreground">{intakeData.medicalHistory || "No significant medical issues reported"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Demographics Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Patient Demographics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs border-b pb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Full Legal Name</span>
                <span className="text-foreground font-medium">
                  {intakeData.legalFirstName} {intakeData.legalLastName}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Pronouns / Gender Identity</span>
                <span className="text-foreground font-medium">
                  {intakeData.pronouns || "—"} ({intakeData.genderIdentity || "—"})
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Contact Email</span>
                <span className="text-foreground font-medium">{intakeData.email || "—"}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Contact Phone</span>
                <span className="text-foreground font-medium">{intakeData.phone || "—"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Insurance Carrier</span>
                <span className="text-foreground font-medium">
                  {intakeData.insuranceProvider || "Self-Pay"}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground font-semibold">Plan Type / Member ID</span>
                <span className="text-foreground font-medium">
                  {intakeData.insurancePlanType || "—"} • {intakeData.insuranceMemberId || "—"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6 col-span-1">
        
        {/* Intake Completion progress checklist card */}
        <Card>
          <CardHeader>
            <CardTitle>Intake Completion</CardTitle>
            <CardDescription>Intake documentation and criteria list completion.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            
            <Progress value={completionPercentage} variant="circle" />

            <div className="w-full space-y-3 pt-4 border-t border-[var(--color-border)]">
              {checklistItems.map((item, idx) => {
                const isDone = item.status === "Complete"
                const isWorking = item.status === "In Progress"

                return (
                  <div key={idx} className="flex items-center gap-2.5 justify-between text-xs">
                    <span className="text-muted-foreground truncate max-w-[80%]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {isDone ? (
                        <span className="text-green-600 flex items-center font-bold gap-1 bg-green-50 dark:bg-green-600/10 px-1.5 py-0.5 rounded">
                          <CheckIcon className="h-3 w-3 stroke-[3]" />
                          Complete
                        </span>
                      ) : isWorking ? (
                        <span className="text-amber-600 flex items-center font-bold gap-1 bg-amber-50 dark:bg-amber-600/10 px-1.5 py-0.5 rounded">
                          <MinusCircleIcon className="h-3 w-3" />
                          Progress
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-1 bg-gray-50 dark:bg-gray-600/10 px-1.5 py-0.5 rounded">
                          <CircleIcon className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <Button onClick={onEditIntake} variant="default" className="w-full mt-2">
              Edit Intake Form
            </Button>

            <div className="text-[10px] text-center text-muted-foreground">
              Last edited: {new Date(patient.lastUpdated).toLocaleDateString()} at{" "}
              {new Date(patient.lastUpdated).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              by Coordinator
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

