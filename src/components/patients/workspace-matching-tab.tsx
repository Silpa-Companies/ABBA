/**
 * @file        workspace-matching-tab.tsx
 * @description Tab panel that allows matching the patient with clinicians. Features a filter sidebar and ranked results.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  MapPinIcon,
  LanguagesIcon,
  CheckIcon,
  UserIcon,
} from "lucide-react"
import type { PatientRecord, ClinicianRecord } from "@/lib/data/mock-data"

export interface WorkspaceMatchingTabProps {
  /** Patient details used for default matching criteria */
  patient: PatientRecord
  /** Complete master database of clinicians */
  clinicians: ClinicianRecord[]
  /** Array of shortlisted clinician IDs */
  recommendedIds: string[]
  /** Triggered when the recommendations shortlist updates */
  onUpdateRecommendations: (ids: string[]) => void
}

/**
 * Clinician matching tab panel.
 * Simplified React layout utilizing direct array modifications and calculations.
 * 
 * @param props - Matching tab properties
 * @returns React node
 */
export function WorkspaceMatchingTab({
  clinicians,
  recommendedIds,
  onUpdateRecommendations,
}: WorkspaceMatchingTabProps) {
  // Sidebar search and filters state
  const [searchName, setSearchName] = React.useState("")
  const [selectedSpecialties, setSelectedSpecialties] = React.useState<string[]>([])
  const [modality, setModality] = React.useState<"All" | "Telehealth" | "In-Person">("All")
  const [genderFilter, setGenderFilter] = React.useState("All")
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])
  const [selectedInsurance, setSelectedInsurance] = React.useState("All")

  // Collapsible filter sections
  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>({})

  // Sort criteria selection
  const [sortBy, setSortBy] = React.useState<"match" | "name" | "experience">("match")

  // Modal profile preview target state
  const [previewClinician, setPreviewClinician] = React.useState<ClinicianRecord | null>(null)

  const toggleSection = (section: string) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    })
  }

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
  }

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const handleClearAll = () => {
    setSearchName("")
    setSelectedSpecialties([])
    setModality("All")
    setGenderFilter("All")
    setSelectedLanguages([])
    setSelectedInsurance("All")
  }

  // Filter clinicians in place
  const filtered = clinicians.filter((c) => {
    if (searchName && !c.name.toLowerCase().includes(searchName.toLowerCase())) return false
    
    if (selectedSpecialties.length > 0) {
      const hasAll = selectedSpecialties.every((s) => c.specialties.includes(s))
      if (!hasAll) return false
    }

    if (modality !== "All" && !c.modalities.includes(modality as any)) return false
    
    if (genderFilter !== "All") {
      const isFemale = c.name.startsWith("Dr. Sarah") || c.name.startsWith("Dr. Elena")
      if (genderFilter === "Female" && !isFemale) return false
      if (genderFilter === "Male" && isFemale) return false
    }

    if (selectedLanguages.length > 0) {
      const hasAllLangs = selectedLanguages.every((l) => c.languages.includes(l))
      if (!hasAllLangs) return false
    }

    if (selectedInsurance !== "All" && !c.acceptedInsurance.includes(selectedInsurance)) return false

    return true
  })

  // Sort clinicians in place
  const sorted = [...filtered]
  if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === "experience") {
    sorted.sort((a, b) => b.yearsExperience - a.yearsExperience)
  } else {
    sorted.sort((a, b) => b.matchFactors.specialty - a.matchFactors.specialty)
  }

  const toggleRecommend = (id: string) => {
    if (recommendedIds.includes(id)) {
      onUpdateRecommendations(recommendedIds.filter((item) => item !== id))
    } else {
      onUpdateRecommendations([...recommendedIds, id])
    }
  }

  const getAvailabilityColor = (state: ClinicianRecord["availabilityState"]) => {
    if (state === "open") return "bg-green-500"
    if (state === "limited") return "bg-amber-500"
    return "bg-gray-400"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      {/* Sticky Left Filter Sidebar */}
      <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-[280px]">
        <div className="bg-card border border-[var(--color-border)] rounded-xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-2 border-[var(--color-border)]">
            <span className="text-xs font-bold text-foreground">Filters</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[10px] text-[var(--color-primary-600)] font-semibold hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="relative">
            <SearchIcon className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search clinician name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-8 h-8 text-xs w-full"
            />
          </div>

          {/* Specialty Section */}
          <div className="border-t pt-3 border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => toggleSection("specialty")}
              className="flex items-center justify-between w-full text-xs font-semibold text-foreground cursor-pointer select-none"
            >
              <span>Specialty / Expertise</span>
              {collapsedSections.specialty ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronUpIcon className="h-3 w-3" />}
            </button>
            {!collapsedSections.specialty && (
              <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
                {["Anxiety", "Depression", "Trauma", "Burnout", "Grief", "Relationship Issues"].map((spec) => (
                  <label key={spec} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                    <Checkbox
                      checked={selectedSpecialties.includes(spec)}
                      onCheckedChange={() => toggleSpecialty(spec)}
                    />
                    <span>{spec}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Modality Section */}
          <div className="border-t pt-3 border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => toggleSection("modality")}
              className="flex items-center justify-between w-full text-xs font-semibold text-foreground cursor-pointer select-none"
            >
              <span>Modality</span>
              {collapsedSections.modality ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronUpIcon className="h-3 w-3" />}
            </button>
            {!collapsedSections.modality && (
              <div className="mt-2 flex gap-1.5 animate-in fade-in duration-150">
                {["All", "Telehealth", "In-Person"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setModality(mode as any)}
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-semibold border rounded cursor-pointer transition-colors",
                      modality === mode
                        ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-primary-foreground"
                        : "bg-background border-[var(--color-border)] text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gender Section */}
          <div className="border-t pt-3 border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => toggleSection("gender")}
              className="flex items-center justify-between w-full text-xs font-semibold text-foreground cursor-pointer select-none"
            >
              <span>Therapist Gender</span>
              {collapsedSections.gender ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronUpIcon className="h-3 w-3" />}
            </button>
            {!collapsedSections.gender && (
              <div className="mt-2 animate-in fade-in duration-150">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none"
                >
                  <option value="All">No preference</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            )}
          </div>

          {/* Language Section */}
          <div className="border-t pt-3 border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => toggleSection("language")}
              className="flex items-center justify-between w-full text-xs font-semibold text-foreground cursor-pointer select-none"
            >
              <span>Languages spoken</span>
              {collapsedSections.language ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronUpIcon className="h-3 w-3" />}
            </button>
            {!collapsedSections.language && (
              <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
                {["English", "Spanish", "Japanese", "Russian"].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                    <Checkbox
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => toggleLanguage(lang)}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Insurance Section */}
          <div className="border-t pt-3 border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => toggleSection("insurance")}
              className="flex items-center justify-between w-full text-xs font-semibold text-foreground cursor-pointer select-none"
            >
              <span>Accepted Insurance</span>
              {collapsedSections.insurance ? <ChevronDownIcon className="h-3 w-3" /> : <ChevronUpIcon className="h-3 w-3" />}
            </button>
            {!collapsedSections.insurance && (
              <div className="mt-2 animate-in fade-in duration-150">
                <select
                  value={selectedInsurance}
                  onChange={(e) => setSelectedInsurance(e.target.value)}
                  className="w-full h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none"
                >
                  <option value="All">All Insurances</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Blue Cross">Blue Cross</option>
                  <option value="Cigna">Cigna</option>
                  <option value="UnitedHealthcare">UnitedHealthcare</option>
                  <option value="Humana">Humana</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Results List */}
      <div className="lg:col-span-3 space-y-4">
        {/* Results Info bar */}
        <div className="flex items-center justify-between bg-card border border-[var(--color-border)] px-4 py-2.5 rounded-xl shadow-xs text-xs">
          <span className="font-semibold text-foreground">
            {sorted.length} clinician{sorted.length !== 1 ? "s" : ""} matching patient intake
          </span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-7 border border-[var(--color-border)] bg-background rounded-lg px-2 text-[10px] outline-none"
            >
              <option value="match">Best Match</option>
              <option value="name">Name A-Z</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {sorted.map((clinician) => {
            const isAdded = recommendedIds.includes(clinician.id)
            const score = clinician.matchFactors.specialty

            return (
              <Card key={clinician.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start">
                  <img
                    src={clinician.photo}
                    alt={clinician.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border"
                  />

                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          {clinician.name}, <span className="text-muted-foreground font-medium">{clinician.credentials}</span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            {clinician.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <LanguagesIcon className="h-3 w-3" />
                            {clinician.languages.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Match Score Display */}
                      <div className="flex items-center gap-2 bg-muted/40 px-2 py-1 rounded-lg border">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          Match:
                        </span>
                        <span className="text-xs font-black text-foreground">{score}%</span>
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {clinician.specialties.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] h-4.5">
                          {s}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground pt-1 border-t border-[var(--color-border)]">
                      <div>
                        Modality: <span className="text-foreground font-semibold">{clinician.modalities.join(" & ")}</span>
                      </div>
                      <div>
                        Insurance:{" "}
                        <span className="text-foreground font-semibold truncate block max-w-[120px]" title={clinician.acceptedInsurance.join(", ")}>
                          {clinician.acceptedInsurance.slice(0, 2).join(", ")}
                          {clinician.acceptedInsurance.length > 2 ? "..." : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", getAvailabilityColor(clinician.availabilityState))} />
                        <span className="text-foreground font-semibold">
                          {clinician.slotsAvailable > 0
                            ? `${clinician.slotsAvailable} slots available`
                            : "Waitlist only"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--color-border)] md:pl-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewClinician(clinician)}
                      className="flex-1 md:w-36 text-xs h-8"
                    >
                      <UserIcon className="h-3 w-3 mr-1" />
                      View Profile
                    </Button>
                    <Button
                      variant={isAdded ? "secondary" : "default"}
                      size="sm"
                      onClick={() => toggleRecommend(clinician.id)}
                      disabled={isAdded}
                      className={cn("flex-1 md:w-36 text-xs h-8", isAdded && "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] cursor-default hover:bg-[var(--color-primary-100)]")}
                    >
                      {isAdded ? (
                        <>
                          <CheckIcon className="h-3.5 w-3.5 mr-1 text-green-600 stroke-[3]" />
                          Shortlisted
                        </>
                      ) : (
                        "+ Shortlist"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Clinician Profile details modal */}
      {previewClinician && (
        <Dialog
          open={true}
          onOpenChange={() => setPreviewClinician(null)}
          title={`${previewClinician.name}, ${previewClinician.credentials}`}
          description="Detailed clinical background, modalities, rating metrics, and accepted insurances."
        >
          <div className="space-y-4">
            <div className="flex gap-4 items-start border-b pb-4">
              <img
                src={previewClinician.photo}
                alt={previewClinician.name}
                className="w-20 h-20 rounded-xl object-cover border"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="success">⭐ {previewClinician.rating} Rating</Badge>
                  <span className="text-xs text-muted-foreground">
                    {previewClinician.yearsExperience} Years Experience
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{previewClinician.location}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {previewClinician.languages.map((l) => (
                    <Badge key={l} variant="outline" className="text-[10px]">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-foreground">Biography Summary</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {previewClinician.bio}
              </p>
            </div>

            <div className="space-y-1.5 border-t pt-3">
              <h4 className="text-xs font-bold text-foreground">Accepted Insurance Carriers</h4>
              <div className="flex flex-wrap gap-1">
                {previewClinician.acceptedInsurance.map((ins) => (
                  <Badge key={ins} variant="secondary">
                    {ins}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost" onClick={() => setPreviewClinician(null)} size="sm">
                Close Profile
              </Button>
              <Button
                variant={recommendedIds.includes(previewClinician.id) ? "secondary" : "default"}
                onClick={() => {
                  toggleRecommend(previewClinician.id)
                  setPreviewClinician(null)
                }}
                size="sm"
              >
                {recommendedIds.includes(previewClinician.id) ? "Remove Shortlist" : "Add to Shortlist"}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

