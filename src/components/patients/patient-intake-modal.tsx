/**
 * @file        patient-intake-modal.tsx
 * @description 4-step patient intake wizard modal implementing demographics, clinical profile (with live scoring), preferences, and review.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  patientIntakeDefaultValues,
  GENDER_IDENTITIES,
  PRONOUNS,
  PRESENTING_ISSUES,
  GOAL_AREAS,
  type PatientIntakeValues,
} from "@/lib/validation/intake"
import { CheckIcon, CalendarIcon, ShieldAlertIcon } from "lucide-react"

export interface PatientIntakeModalProps {
  /** Visibility state of the wizard dialog */
  open: boolean
  /** Callback triggered when closing the modal */
  onClose: () => void
  /** Callback triggered when a draft is saved */
  onSaveDraft: (data: PatientIntakeValues) => void
  /** Callback triggered when the final review submission finishes */
  onSubmit: (data: PatientIntakeValues) => void
  /** Optional pre-loaded patient record for edit mode */
  editingPatient?: PatientIntakeValues | null
}

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
]

const SCORE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const TIME_PERIODS = ["Morning", "Afternoon", "Evening"]

/**
 * Multi-step Patient Intake Wizard component.
 * Simplified React implementation without heavy hook form wrappers.
 * 
 * @param props - Intake modal control triggers and props
 * @returns React node
 */
export function PatientIntakeModal({
  open,
  onClose,
  onSaveDraft,
  onSubmit,
  editingPatient,
}: PatientIntakeModalProps) {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState<PatientIntakeValues>(patientIntakeDefaultValues)
  const [langInput, setLangInput] = React.useState("")

  // Reset or load initial data when editing record is bound
  React.useEffect(() => {
    if (open) {
      setFormData(editingPatient || patientIntakeDefaultValues)
      setStep(1)
    }
  }, [editingPatient, open])

  // Single helper to update form field without prev spread clutter
  const updateField = (key: keyof PatientIntakeValues, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const updateGad7 = (idx: number, score: number) => {
    const newAnswers = [...(formData.gad7Answers || [])]
    newAnswers[idx] = score
    updateField("gad7Answers", newAnswers)
  }

  const updatePhq9 = (idx: number, score: number) => {
    const newAnswers = [...(formData.phq9Answers || [])]
    newAnswers[idx] = score
    updateField("phq9Answers", newAnswers)
  }

  // GAD-7 live scoring calculation
  const gad7Total = React.useMemo(() => {
    const answered = (formData.gad7Answers || []).filter((val): val is number => val !== null && val !== undefined)
    if (answered.length === 0) return null
    return answered.reduce((a, b) => a + b, 0)
  }, [formData.gad7Answers])

  // PHQ-9 live scoring calculation
  const phq9Total = React.useMemo(() => {
    const answered = (formData.phq9Answers || []).filter((val): val is number => val !== null && val !== undefined)
    if (answered.length === 0) return null
    return answered.reduce((a, b) => a + b, 0)
  }, [formData.phq9Answers])

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

  const toggleAvailabilityCell = (day: string, period: string) => {
    const key = `${day}-${period.toLowerCase()}`
    const currentVal = (formData.availability || {})[key] || false
    updateField("availability", {
      ...(formData.availability || {}),
      [key]: !currentVal,
    })
  }

  const toggleIssueChip = (issue: string) => {
    const active = (formData.presentingIssues || []).includes(issue)
    const nextVal = active
      ? (formData.presentingIssues || []).filter((i) => i !== issue)
      : [...(formData.presentingIssues || []), issue]
    updateField("presentingIssues", nextVal)
  }

  const toggleGoalChip = (goal: string) => {
    const active = (formData.goalAreas || []).includes(goal)
    const nextVal = active
      ? (formData.goalAreas || []).filter((g) => g !== goal)
      : [...(formData.goalAreas || []), goal]
    updateField("goalAreas", nextVal)
  }

  const addLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && langInput.trim() !== "") {
      e.preventDefault()
      const languages = formData.languages || []
      if (!languages.includes(langInput.trim())) {
        updateField("languages", [...languages, langInput.trim()])
      }
      setLangInput("")
    }
  }

  const removeLanguage = (lang: string) => {
    updateField(
      "languages",
      (formData.languages || []).filter((l) => l !== lang)
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      title={editingPatient ? "Edit Patient Intake" : "New Patient Intake"}
      description="Register patient demographics, screening metrics, modality preferences, and insurance details."
    >
      <div className="flex flex-col gap-6">
        {/* Step Indicator Header bar */}
        <div className="flex items-center justify-between border-b pb-4 border-[var(--color-border)] select-none">
          {[1, 2, 3, 4].map((stepNum, idx) => {
            const isActive = step === stepNum
            const isCompleted = step > stepNum
            const labels = ["Demographics", "Clinical Profile", "Preferences", "Review & Submit"]

            return (
              <React.Fragment key={stepNum}>
                {idx > 0 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors duration-300",
                      step > idx ? "bg-[var(--color-primary-600)]" : "bg-[var(--color-gray-200)]"
                    )}
                  />
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300",
                      isCompleted
                        ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                        : isActive
                        ? "bg-foreground border-foreground text-background font-bold ring-2 ring-foreground/20"
                        : "bg-background border-[var(--color-border)] text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <CheckIcon className="h-3.5 w-3.5 stroke-[3]" /> : stepNum}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium hidden md:inline",
                      isActive ? "text-foreground font-bold" : "text-muted-foreground"
                    )}
                  >
                    {labels[stepNum - 1]}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* Step Contents */}
        <div className="min-h-[40vh] py-2">
          {/* STEP 1: Demographics */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">First Name *</label>
                  <Input
                    value={formData.legalFirstName}
                    onChange={(e) => updateField("legalFirstName", e.target.value)}
                    placeholder="Legal first name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Last Name *</label>
                  <Input
                    value={formData.legalLastName}
                    onChange={(e) => updateField("legalLastName", e.target.value)}
                    placeholder="Legal last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-semibold text-foreground">Date of Birth *</label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-semibold text-foreground">Gender Identity</label>
                  <select
                    value={formData.genderIdentity || ""}
                    onChange={(e) => updateField("genderIdentity", e.target.value)}
                    className="w-full h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select identity...</option>
                    {GENDER_IDENTITIES.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-semibold text-foreground">Pronouns</label>
                  <select
                    value={formData.pronouns || ""}
                    onChange={(e) => updateField("pronouns", e.target.value)}
                    className="w-full h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Select pronouns...</option>
                    {PRONOUNS.map((pron) => (
                      <option key={pron} value={pron}>
                        {pron}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="(512) 555-0199"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Email Address</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div className="border-t pt-4 border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-foreground mb-3">Emergency Contact</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Full Name</label>
                    <Input
                      value={formData.emergencyContactName || ""}
                      onChange={(e) => updateField("emergencyContactName", e.target.value)}
                      placeholder="Contact name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Relationship</label>
                    <Input
                      value={formData.emergencyContactRelationship || ""}
                      onChange={(e) => updateField("emergencyContactRelationship", e.target.value)}
                      placeholder="e.g. Spouse"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Phone Number</label>
                    <Input
                      value={formData.emergencyContactPhone || ""}
                      onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
                      placeholder="Contact phone"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Clinical Profile */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">Chief Complaint</label>
                <Textarea
                  value={formData.chiefComplaint || ""}
                  onChange={(e) => updateField("chiefComplaint", e.target.value)}
                  placeholder="Enter detailed description of presenting symptoms and history..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">Presenting Issue Chips</label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESENTING_ISSUES.map((issue) => {
                    const active = (formData.presentingIssues || []).includes(issue)
                    return (
                      <button
                        key={issue}
                        type="button"
                        onClick={() => toggleIssueChip(issue)}
                        className={cn(
                          "px-2.5 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors border",
                          active
                            ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                            : "bg-background border-[var(--color-border)] text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {issue}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">Treatment Goals & Area Chips</label>
                <Textarea
                  value={formData.treatmentGoals || ""}
                  onChange={(e) => updateField("treatmentGoals", e.target.value)}
                  placeholder="What is the client hoping to achieve in therapy?"
                  className="min-h-[60px]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {GOAL_AREAS.map((goal) => {
                    const active = (formData.goalAreas || []).includes(goal)
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoalChip(goal)}
                        className={cn(
                          "px-2.5 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors border",
                          active
                            ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                            : "bg-background border-[var(--color-border)] text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {goal}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Standardized Screenings */}
              <div className="border-t pt-4 border-[var(--color-border)] space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">GAD-7 (Anxiety)</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Score: <span className="font-bold text-foreground">{gad7Total === null ? "—" : `${gad7Total} / 21`}</span>
                      </span>
                      {gad7Total !== null && (
                        <Badge variant={gad7Total >= 10 ? "danger" : "secondary"}>
                          {getGad7Severity(gad7Total)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={gad7Total || 0} max={21} variant="bar" />
                  
                  <div className="space-y-2.5 mt-4 max-h-[160px] overflow-y-auto border p-3 rounded-lg bg-muted/20">
                    {GAD7_QUESTIONS.map((q, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-2 last:border-0 last:pb-0">
                        <span className="text-xs text-foreground font-medium md:max-w-[55%]">
                          {idx + 1}. {q}
                        </span>
                        <div className="flex gap-1.5">
                          {SCORE_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updateGad7(idx, opt.value)}
                              className={cn(
                                "h-6 px-1.5 text-[10px] font-medium border rounded cursor-pointer transition-colors",
                                (formData.gad7Answers || [])[idx] === opt.value
                                  ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                                  : "bg-background border-[var(--color-border)] text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {opt.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">PHQ-9 (Depression)</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Score: <span className="font-bold text-foreground">{phq9Total === null ? "—" : `${phq9Total} / 27`}</span>
                      </span>
                      {phq9Total !== null && (
                        <Badge variant={phq9Total >= 10 ? "danger" : "secondary"}>
                          {getPhq9Severity(phq9Total)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={phq9Total || 0} max={27} variant="bar" />

                  <div className="space-y-2.5 mt-4 max-h-[160px] overflow-y-auto border p-3 rounded-lg bg-muted/20">
                    {PHQ9_QUESTIONS.map((q, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-2 last:border-0 last:pb-0">
                        <span className="text-xs text-foreground font-medium md:max-w-[55%]">
                          {idx + 1}. {q}
                        </span>
                        <div className="flex gap-1.5">
                          {SCORE_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updatePhq9(idx, opt.value)}
                              className={cn(
                                "h-6 px-1.5 text-[10px] font-medium border rounded cursor-pointer transition-colors",
                                (formData.phq9Answers || [])[idx] === opt.value
                                  ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                                  : "bg-background border-[var(--color-border)] text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {opt.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prior Therapy & Medications */}
              <div className="border-t pt-4 border-[var(--color-border)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">Prior Therapy History</span>
                    <span className="text-[10px] text-muted-foreground">
                      Has this client attended professional counseling sessions previously?
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={formData.priorTherapy || false}
                    onChange={(e) => updateField("priorTherapy", e.target.checked)}
                    className="h-4 w-8 rounded-full border border-[var(--color-border)] bg-gray-200 outline-none cursor-pointer checked:bg-[var(--color-primary-600)] transition-colors appearance-none relative before:absolute before:h-3 before:w-3 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4"
                  />
                </div>

                {formData.priorTherapy && (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-xs font-semibold text-foreground">Therapy Details</label>
                    <Textarea
                      value={formData.priorTherapyDetails || ""}
                      onChange={(e) => updateField("priorTherapyDetails", e.target.value)}
                      placeholder="Please note duration, therapist profile, and efficacy..."
                      className="min-h-[50px]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Current Medications</label>
                    <Input
                      value={formData.currentMedications || ""}
                      onChange={(e) => updateField("currentMedications", e.target.value)}
                      placeholder="e.g. Escitalopram 10mg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Significant Medical History</label>
                    <Input
                      value={formData.medicalHistory || ""}
                      onChange={(e) => updateField("medicalHistory", e.target.value)}
                      placeholder="e.g. Type II Diabetes"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Preferences & Constraints */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-semibold text-foreground">Care Modality Preference</label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <button
                      type="button"
                      onClick={() => updateField("modality", "Telehealth")}
                      className={cn(
                        "p-4 border rounded-xl flex flex-col items-center gap-2 cursor-pointer transition-all",
                        formData.modality === "Telehealth"
                          ? "border-foreground bg-muted/20 ring-1 ring-foreground"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary-400)]"
                      )}
                    >
                      <span className="font-semibold text-sm">Telehealth</span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        Video or voice conferencing appointments.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("modality", "In-Person")}
                      className={cn(
                        "p-4 border rounded-xl flex flex-col items-center gap-2 cursor-pointer transition-all",
                        formData.modality === "In-Person"
                          ? "border-foreground bg-muted/20 ring-1 ring-foreground"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary-400)]"
                      )}
                    >
                      <span className="font-semibold text-sm">In-Person</span>
                      <span className="text-[10px] text-muted-foreground text-center">
                        Requires office travel for physical appointments.
                      </span>
                    </button>
                  </div>
                </div>

                {formData.modality === "In-Person" && (
                  <div className="space-y-1 col-span-2 animate-in slide-in-from-top-2 duration-150">
                    <label className="text-xs font-semibold text-foreground">ZIP / Location *</label>
                    <Input
                      value={formData.zipCode || ""}
                      onChange={(e) => updateField("zipCode", e.target.value)}
                      placeholder="e.g. 78701"
                    />
                  </div>
                )}
              </div>

              {/* Language Tags dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">Languages Spoken</label>
                <div className="flex flex-wrap gap-1 border p-2 rounded-lg bg-background">
                  {(formData.languages || []).map((lang) => (
                    <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang)}
                        className="hover:text-destructive cursor-pointer font-bold text-[10px]"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <input
                    type="text"
                    placeholder={(formData.languages || []).length === 0 ? "Type language & press Enter..." : "Add language..."}
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={addLanguage}
                    className="flex-1 min-w-[120px] bg-transparent outline-none border-none text-xs px-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Therapist Gender Preference</label>
                  <select
                    value={formData.therapistGender || ""}
                    onChange={(e) => updateField("therapistGender", e.target.value)}
                    className="w-full h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  >
                    <option value="">No preference</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Session Frequency</label>
                  <div className="flex items-center gap-4 mt-2">
                    {(["Weekly", "Bi-weekly", "Flexible"] as const).map((freq) => (
                      <label key={freq} className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer select-none">
                        <input
                          type="radio"
                          value={freq}
                          checked={formData.sessionFrequency === freq}
                          onChange={() => updateField("sessionFrequency", freq)}
                          className="h-3.5 w-3.5 accent-[var(--color-primary-600)]"
                        />
                        {freq}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground block">Cultural / Community Notes</label>
                <Textarea
                  value={formData.culturalNotes || ""}
                  onChange={(e) => updateField("culturalNotes", e.target.value)}
                  placeholder="Share details regarding cultural expectations, specific therapy modalities, or preferences..."
                  className="min-h-[50px]"
                />
              </div>

              {/* Insurance */}
              <div className="border-t pt-4 border-[var(--color-border)] space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Insurance Verification</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Provider</label>
                    <Input
                      value={formData.insuranceProvider || ""}
                      onChange={(e) => updateField("insuranceProvider", e.target.value)}
                      placeholder="e.g. Aetna"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Plan Type</label>
                    <Input
                      value={formData.insurancePlanType || ""}
                      onChange={(e) => updateField("insurancePlanType", e.target.value)}
                      placeholder="e.g. HMO / PPO"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Member ID</label>
                    <Input
                      value={formData.insuranceMemberId || ""}
                      onChange={(e) => updateField("insuranceMemberId", e.target.value)}
                      placeholder="ID number"
                    />
                  </div>
                </div>

                <div className="bg-[var(--color-warning-50)] border border-[var(--color-warning-500)]/10 p-3 rounded-lg flex gap-3 text-[var(--color-warning-600)] animate-in fade-in duration-200">
                  <ShieldAlertIcon className="h-5 w-5 shrink-0 text-[var(--color-warning-500)]" />
                  <div className="text-xs">
                    <span className="font-bold">Important Network Verification:</span> In-network insurance plans
                    must be verified for eligibility before matching clinician suggestions are sent to the patient.
                  </div>
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="border-t pt-4 border-[var(--color-border)] space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Weekly Availability Calendar</h3>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">
                  Select day and time blocks suitable for therapist sessions (toggable cards).
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-[var(--color-border)] rounded-lg overflow-hidden bg-card">
                    <thead>
                      <tr className="bg-[var(--color-gray-50)] dark:bg-muted/40 border-b">
                        <th className="p-2 font-semibold">Period</th>
                        {DAYS_OF_WEEK.map((d) => (
                          <th key={d} className="p-2 font-semibold text-center w-[12%]">
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_PERIODS.map((period) => (
                        <tr key={period} className="border-b last:border-0">
                          <td className="p-2 font-medium bg-[var(--color-gray-50)] dark:bg-muted/20">
                            {period}
                          </td>
                          {DAYS_OF_WEEK.map((day) => {
                            const key = `${day}-${period.toLowerCase()}`
                            const isToggled = (formData.availability || {})[key] || false

                            return (
                              <td key={day} className="p-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => toggleAvailabilityCell(day, period)}
                                  className={cn(
                                    "w-full h-8 rounded border transition-colors cursor-pointer text-[10px] font-semibold flex items-center justify-center",
                                    isToggled
                                      ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                                      : "bg-background border-[var(--color-border)] text-muted-foreground hover:border-[var(--color-primary-400)]"
                                  )}
                                >
                                  {isToggled && <CheckIcon className="h-3 w-3 mr-0.5" />}
                                  {period[0]}
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <p className="text-xs text-muted-foreground">
                Please review patient profile details before finalizing record creation.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 border rounded-lg bg-muted/10 space-y-1">
                  <span className="font-bold text-[var(--color-primary-800)] dark:text-foreground">Demographics</span>
                  <div>Name: {formData.legalFirstName} {formData.legalLastName}</div>
                  <div>DOB: {formData.dateOfBirth}</div>
                  <div>Gender: {formData.genderIdentity || "—"}</div>
                  <div>Pronouns: {formData.pronouns || "—"}</div>
                  <div>Email: {formData.email || "—"}</div>
                  <div>Phone: {formData.phone || "—"}</div>
                </div>

                <div className="p-3 border rounded-lg bg-muted/10 space-y-1">
                  <span className="font-bold text-[var(--color-primary-800)] dark:text-foreground">Preferences</span>
                  <div>Modality: {formData.modality}</div>
                  {formData.modality === "In-Person" && <div>ZIP: {formData.zipCode}</div>}
                  <div>Frequency: {formData.sessionFrequency}</div>
                  <div>Gender Pref: {formData.therapistGender || "No preference"}</div>
                  <div>Languages: {(formData.languages || []).join(", ")}</div>
                </div>

                <div className="p-3 border rounded-lg bg-muted/10 space-y-1 col-span-2">
                  <span className="font-bold text-[var(--color-primary-800)] dark:text-foreground">Clinical Summary</span>
                  <div>Chief Complaint: {formData.chiefComplaint || "—"}</div>
                  <div className="flex gap-2.5 mt-1 items-center">
                    <div>
                      GAD-7 Score: <span className="font-bold">{gad7Total === null ? "—" : gad7Total}</span>
                    </div>
                    <div>
                      PHQ-9 Score: <span className="font-bold">{phq9Total === null ? "—" : phq9Total}</span>
                    </div>
                  </div>
                  <div>Prior Therapy: {formData.priorTherapy ? `Yes: ${formData.priorTherapyDetails}` : "No"}</div>
                  <div>Medications: {formData.currentMedications || "—"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t pt-4 border-[var(--color-border)] select-none">
          <span className="text-xs text-muted-foreground font-semibold">
            Step {step} of 4
          </span>

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={onClose} size="sm">
              Cancel
            </Button>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} size="sm">
                Back
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onSaveDraft(formData)} size="sm">
              Save Draft
            </Button>
            {step < 4 ? (
              <Button type="button" variant="default" onClick={() => setStep(step + 1)} size="sm">
                Continue
              </Button>
            ) : (
              <Button type="button" variant="default" onClick={() => onSubmit(formData)} size="sm">
                Submit & Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}

