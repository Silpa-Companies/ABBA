/**
 * @file        workspace-recommendations-tab.tsx
 * @description Recommendations tab panel showing the top 3 clinician suggestions, matching breakdowns, email preview, and send actions.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import {
  SendIcon,
  MailIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  UserPlusIcon,
  CheckIcon,
} from "lucide-react"
import type { PatientRecord, ClinicianRecord } from "@/lib/data/mock-data"

export interface WorkspaceRecommendationsTabProps {
  /** Active patient record */
  patient: PatientRecord
  /** Complete master list of clinicians */
  clinicians: ClinicianRecord[]
  /** Selected clinician IDs shortlisted for recommendations */
  recommendedIds: string[]
  /** Triggered to update shortlist */
  onUpdateRecommendations: (ids: string[]) => void
  /** Triggered to send recommendations to the client */
  onSendToPatient: () => void
  /** Controls active network activity loading state */
  isSending?: boolean
  /** Controls successful submission notification state */
  sentSuccess?: boolean
}

/**
 * Workspace Recommendations tab panel.
 * Simplified React layout calculating lists directly in render.
 * 
 * @param props - Recommendations tab properties
 * @returns React node
 */
export function WorkspaceRecommendationsTab({
  patient,
  clinicians,
  recommendedIds,
  onUpdateRecommendations,
  onSendToPatient,
  isSending = false,
  sentSuccess = false,
}: WorkspaceRecommendationsTabProps) {
  // Excluded clinician IDs (all top suggestions are included by default)
  const [excludedIds, setExcludedIds] = React.useState<string[]>([])
  // Email template review dialog visibility
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  // Last updated timestamp state
  const [lastRefreshed, setLastRefreshed] = React.useState(new Date().toISOString())
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  // Map shortlisted clinician objects directly
  const shortlistedClinicians = clinicians.filter((c) => recommendedIds.includes(c.id))

  // Get Top 3 suggestions (or fallback list from clinicians database if none shortlisted)
  const topSuggestions = shortlistedClinicians.length > 0
    ? shortlistedClinicians.slice(0, 3)
    : clinicians.slice(0, 3)

  // Get additional suggestions beyond top 3
  const topIds = topSuggestions.map((c) => c.id)
  const additionalSuggestions = clinicians.filter((c) => !topIds.includes(c.id))

  const toggleInclusion = (id: string) => {
    if (excludedIds.includes(id)) {
      setExcludedIds(excludedIds.filter((item) => item !== id))
    } else {
      setExcludedIds([...excludedIds, id])
    }
  }

  // Handle manual database refresh action
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastRefreshed(new Date().toISOString())
      setIsRefreshing(false)
    }, 800)
  }

  // Helper network status chip styles resolver
  const getNetworkStatusChip = (clinician: ClinicianRecord) => {
    const isBlueCross = clinician.acceptedInsurance.includes("Blue Cross") || clinician.acceptedInsurance.includes("Blue Shield")
    const isPatientInNetwork = patient.intakeData.insuranceProvider === "Blue Cross" && isBlueCross

    if (isPatientInNetwork || clinician.acceptedInsurance.includes(patient.intakeData.insuranceProvider || "")) {
      return (
        <Badge variant="success" className="gap-1 text-[10px]">
          <ShieldCheckIcon className="h-3 w-3 stroke-[3]" />
          In-Network
        </Badge>
      )
    }

    return (
      <Badge variant="warning" className="gap-1 text-[10px]">
        <AlertTriangleIcon className="h-3 w-3" />
        Verify Benefits
      </Badge>
    )
  }

  const selectedCount = topSuggestions.filter((c) => !excludedIds.includes(c.id)).length

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Summary recommendation bar */}
      <div className="bg-card border border-[var(--color-border)] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5 min-w-0">
          <h3 className="text-sm font-bold text-foreground">
            {selectedCount} Recommendations ready to send
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            Based on Presenting Concerns ({(patient.intakeData.presentingIssues || []).slice(0, 2).join(", ")}), Modality ({patient.intakeData.modality}), and Insurance ({patient.intakeData.insuranceProvider || "Self-Pay"}).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center text-xs text-[var(--color-primary-600)] font-semibold hover:underline cursor-pointer gap-1"
          >
            <MailIcon className="h-3.5 w-3.5" />
            Preview Email
          </button>
          <Button
            variant={sentSuccess ? "outline" : "default"}
            onClick={onSendToPatient}
            disabled={isSending || selectedCount === 0}
            size="sm"
            className={cn(sentSuccess && "border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400")}
          >
            <SendIcon className="h-3.5 w-3.5 mr-1" />
            {isSending ? "Sending..." : sentSuccess ? "Sent!" : "Send to Patient"}
          </Button>
        </div>
      </div>

      {/* Top 3 Suggestion Cards in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topSuggestions.map((clinician, idx) => {
          const rank = idx + 1
          const isIncluded = !excludedIds.includes(clinician.id)
          const score = clinician.matchFactors.specialty

          return (
            <Card
              key={clinician.id}
              className={cn(
                "relative transition-all overflow-hidden border-t-4",
                isIncluded ? "border-t-[var(--color-primary-600)]" : "border-t-gray-300 opacity-75"
              )}
            >
              <div className="absolute top-2 left-2 flex items-center justify-center h-6 w-6 rounded-full bg-foreground text-background text-xs font-black">
                #{rank}
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1.5 select-none">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  {isIncluded ? "Included" : "Excluded"}
                </span>
                <input
                  type="checkbox"
                  checked={isIncluded}
                  onChange={() => toggleInclusion(clinician.id)}
                  className="h-3.5 w-7 rounded-full border bg-gray-200 outline-none cursor-pointer checked:bg-[var(--color-primary-600)] transition-colors appearance-none relative before:absolute before:h-2.5 before:w-2.5 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-3.5"
                />
              </div>

              <CardContent className="p-4 pt-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={clinician.photo}
                    alt={clinician.name}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {clinician.name}
                    </h4>
                    <span className="text-xs text-muted-foreground block truncate">
                      {clinician.credentials}
                    </span>
                    {getNetworkStatusChip(clinician)}
                  </div>
                </div>

                <div className="flex items-center justify-around bg-muted/20 p-2.5 rounded-lg border border-[var(--color-border)]">
                  <Progress value={score} variant="donut" />

                  <div className="flex flex-col gap-1 flex-1 max-w-[55%]">
                    {[
                      { label: "Specialty", val: clinician.matchFactors.specialty },
                      { label: "Schedule", val: clinician.matchFactors.availability },
                      { label: "Insurance", val: clinician.matchFactors.insurance },
                      { label: "Location", val: clinician.matchFactors.location },
                    ].map((f) => (
                      <div key={f.label} className="space-y-0.5">
                        <div className="flex justify-between text-[8px] font-semibold text-muted-foreground">
                          <span>{f.label}</span>
                          <span>{f.val}%</span>
                        </div>
                        <Progress value={f.val} variant="bar" className="h-1 bg-gray-100" />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed min-h-[54px]">
                  {clinician.bio}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t pt-3 border-[var(--color-border)]">
                  <div>Rating: <span className="text-foreground font-semibold">⭐ {clinician.rating}</span></div>
                  <div>Languages: <span className="text-foreground font-semibold truncate block max-w-[80px]" title={clinician.languages.join(", ")}>{clinician.languages.join(", ")}</span></div>
                  <div>Modality: <span className="text-foreground font-semibold truncate block max-w-[80px]">{clinician.modalities.join(", ")}</span></div>
                  <div>Experience: <span className="text-foreground font-semibold">{clinician.yearsExperience} yrs</span></div>
                </div>

                <Button
                  type="button"
                  variant={isIncluded ? "outline" : "default"}
                  onClick={() => toggleInclusion(clinician.id)}
                  className="w-full text-xs h-8 mt-2"
                >
                  {isIncluded ? (
                    <>
                      <CheckIcon className="h-3.5 w-3.5 mr-1 text-green-600 stroke-[3]" />
                      Included in Send
                    </>
                  ) : (
                    "Include in Send"
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional matching suggestions */}
      <div className="border-t pt-6 border-[var(--color-border)] space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Additional matching clinician suggestions</h3>
        <div className="space-y-2">
          {additionalSuggestions.length === 0 ? (
            <p className="text-xs text-muted-foreground">No other matching clinicians available.</p>
          ) : (
            additionalSuggestions.map((clinician, idx) => {
              const isAdded = recommendedIds.includes(clinician.id)
              const score = clinician.matchFactors.specialty

              return (
                <div
                  key={clinician.id}
                  className="bg-card border border-[var(--color-border)] rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="font-mono text-muted-foreground w-6 text-center">#{idx + 4}</span>
                    <img
                      src={clinician.photo}
                      alt={clinician.name}
                      className="w-10 h-10 rounded-lg object-cover border"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground truncate">
                        {clinician.name}, <span className="text-muted-foreground font-medium">{clinician.credentials}</span>
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(clinician.specialties || []).slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-[9px] h-4">
                            {s}
                          </Badge>
                        ))}
                        {getNetworkStatusChip(clinician)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground">{score}%</span>
                      <span className="text-[10px] text-muted-foreground uppercase">Match</span>
                    </div>

                    <Button
                      variant={isAdded ? "secondary" : "outline"}
                      onClick={() => {
                        if (isAdded) {
                          onUpdateRecommendations(recommendedIds.filter((item) => item !== clinician.id))
                        } else {
                          onUpdateRecommendations([...recommendedIds, clinician.id])
                        }
                      }}
                      className="h-7 text-xs px-2.5"
                    >
                      {isAdded ? (
                        <>
                          <CheckIcon className="h-3 w-3 mr-1 text-green-600 stroke-[3]" />
                          Added
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="h-3 w-3 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Footer Refresh */}
      <div className="flex items-center justify-between border-t pt-4 border-[var(--color-border)] text-[10px] text-muted-foreground select-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-ping shrink-0" />
          <span>
            Recommendations generated at{" "}
            {new Date(lastRefreshed).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center hover:text-foreground cursor-pointer gap-1 transition-colors disabled:opacity-50"
        >
          <RefreshCwIcon className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
          Refresh Matches
        </button>
      </div>

      {/* Communication Preview */}
      {isPreviewOpen && (
        <Dialog
          open={true}
          onOpenChange={() => setIsPreviewOpen(false)}
          title="Patient Communication Preview"
          description="Email template containing clinician suggestions matching patient modalities preferences."
        >
          <div className="space-y-4 text-xs">
            <div className="border rounded-lg p-3 bg-muted/10 space-y-1">
              <div>
                <span className="font-bold">To:</span> {patient.email || `${patient.intakeData.legalFirstName.toLowerCase()}@example.com`}
              </div>
              <div>
                <span className="font-bold">Subject:</span> Clinical Team Recommendation Match - Caremap
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-background space-y-3 font-serif leading-relaxed text-sm text-foreground">
              <p>Dear {patient.name},</p>
              <p>
                We have reviewed your clinical intake preferences regarding{" "}
                <span className="font-sans font-bold bg-muted/40 px-1 rounded">{patient.intakeData.modality}</span> modalities,
                presenting concerns, and schedule requirements.
              </p>
              <p>
                Our coordination engine has shortlisted the following clinical therapists accepting{" "}
                <span className="font-sans font-bold bg-muted/40 px-1 rounded">{patient.intakeData.insuranceProvider || "Self-Pay"}</span>:
              </p>

              <div className="space-y-3 border-l-2 pl-4 py-1 border-[var(--color-primary-600)] font-sans text-xs">
                {topSuggestions
                  .filter((c) => !excludedIds.includes(c.id))
                  .map((c, i) => (
                    <div key={c.id} className="space-y-0.5">
                      <div className="font-bold text-foreground">
                        {i + 1}. {c.name}, {c.credentials}
                      </div>
                      <div className="text-muted-foreground">
                        Specialties: {c.specialties.join(", ")} • Modalities: {c.modalities.join(" & ")}
                      </div>
                    </div>
                  ))}
                {selectedCount === 0 && (
                  <div className="text-red-500 font-bold">No suggestions selected to send.</div>
                )}
              </div>

              <p>
                Please review these suggestions and contact our intake office to schedule your first
                diagnostic evaluation.
              </p>
              <p>Best regards,<br />ABBA Coordination Team</p>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost" onClick={() => setIsPreviewOpen(false)} size="sm">
                Close Preview
              </Button>
              <Button
                variant="default"
                disabled={selectedCount === 0 || isSending}
                onClick={() => {
                  setIsPreviewOpen(false)
                  onSendToPatient()
                }}
                size="sm"
              >
                Send Email Now
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

