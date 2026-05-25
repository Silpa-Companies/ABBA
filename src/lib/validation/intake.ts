/**
 * @file        intake.ts
 * @description Zod validation schema and default values for the 4-step patient intake wizard.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import { z } from "zod"

// Valid presenting issues chips
export const PRESENTING_ISSUES = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Burnout",
  "Grief",
  "Relationship Issues",
  "Stress Management",
  "Life Transitions",
] as const

// Valid clinical goal areas chips
export const GOAL_AREAS = [
  "Coping Skills",
  "Emotional Regulation",
  "Self-Esteem",
  "Communication",
  "Symptom Reduction",
  "Personal Growth",
] as const

// Valid gender identities
export const GENDER_IDENTITIES = [
  "Female",
  "Male",
  "Non-binary",
  "Transgender Female",
  "Transgender Male",
  "Genderqueer",
  "Agender",
  "Prefer not to say",
] as const

// Valid pronouns
export const PRONOUNS = [
  "she/her",
  "he/him",
  "they/them",
  "she/they",
  "he/they",
  "ze/zir",
  "Prefer not to say",
] as const

// Zod validation schema definition for multi-step intake
export const patientIntakeSchema = z.object({
  // Step 1: Demographics
  legalFirstName: z.string().min(1, "Legal first name is required"),
  legalLastName: z.string().min(1, "Legal last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email address").or(z.literal("")),
  genderIdentity: z.enum(GENDER_IDENTITIES).or(z.literal("")),
  pronouns: z.enum(PRONOUNS).or(z.literal("")),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),

  // Step 2: Clinical Profile
  chiefComplaint: z.string().optional(),
  presentingIssues: z.array(z.string()).default([]),
  treatmentGoals: z.string().optional(),
  goalAreas: z.array(z.string()).default([]),
  // Screening scores for GAD-7 & PHQ-9 (represented as arrays of numbers 0-3, or null if unanswered)
  gad7Answers: z.array(z.number().min(0).max(3).nullable()).length(7).default(Array(7).fill(null)),
  phq9Answers: z.array(z.number().min(0).max(3).nullable()).length(9).default(Array(9).fill(null)),
  priorTherapy: z.boolean().default(false),
  priorTherapyDetails: z.string().optional(),
  currentMedications: z.string().optional(),
  medicalHistory: z.string().optional(),

  // Step 3: Preferences & Constraints
  modality: z.enum(["Telehealth", "In-Person"]).default("Telehealth"),
  zipCode: z.string().optional(),
  languages: z.array(z.string()).min(1, "Select at least one preferred language"),
  therapistGender: z.string().optional(),
  culturalNotes: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePlanType: z.string().optional(),
  insuranceMemberId: z.string().optional(),
  // Scheduling availability grid: keys correspond to "day-period", e.g., "Monday-morning"
  availability: z.record(z.string(), z.boolean()).default({}),
  sessionFrequency: z.enum(["Weekly", "Bi-weekly", "Flexible"]).default("Weekly"),
})

export type PatientIntakeValues = z.infer<typeof patientIntakeSchema>

// Default initial state values for a fresh intake session
export const patientIntakeDefaultValues: PatientIntakeValues = {
  legalFirstName: "",
  legalLastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  genderIdentity: "",
  pronouns: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
  chiefComplaint: "",
  presentingIssues: [],
  treatmentGoals: "",
  goalAreas: [],
  gad7Answers: Array(7).fill(null),
  phq9Answers: Array(9).fill(null),
  priorTherapy: false,
  priorTherapyDetails: "",
  currentMedications: "",
  medicalHistory: "",
  modality: "Telehealth",
  zipCode: "",
  languages: ["English"],
  therapistGender: "",
  culturalNotes: "",
  insuranceProvider: "",
  insurancePlanType: "",
  insuranceMemberId: "",
  availability: {},
  sessionFrequency: "Weekly",
}
