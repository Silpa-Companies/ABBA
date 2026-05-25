/**
 * @file        mock-data.ts
 * @description Mock clinician and patient databases representing mock care record entities.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import type { PatientIntakeValues } from "@/lib/validation/intake"

export interface PatientRecord {
  id: string
  name: string
  dob: string
  sex: string
  status: "Draft" | "Under Review" | "Matched" | "Active"
  lastUpdated: string
  assignedClinician: string
  email: string
  intakeData: PatientIntakeValues
}

export interface ClinicianRecord {
  id: string
  name: string
  credentials: string
  photo: string
  specialties: string[]
  modalities: ("Telehealth" | "In-Person")[]
  location: string
  acceptedInsurance: string[]
  availabilityState: "open" | "limited" | "closed"
  slotsAvailable: number
  rating: number
  languages: string[]
  bio: string
  yearsExperience: number
  matchFactors: {
    specialty: number
    availability: number
    insurance: number
    location: number
  }
}

// Preset clinician database
export const MOCK_CLINICIANS: ClinicianRecord[] = [
  {
    id: "CL-001",
    name: "Dr. Sarah Jenkins",
    credentials: "PhD, LCP",
    photo: "https://images.unsplash.com",
    specialties: ["Anxiety", "Depression", "Burnout", "Stress Management"],
    modalities: ["Telehealth", "In-Person"],
    location: "Austin, TX (78701)",
    acceptedInsurance: ["Aetna", "Blue Cross", "Cigna"],
    availabilityState: "open",
    slotsAvailable: 4,
    rating: 4.9,
    languages: ["English", "Spanish"],
    bio: "Clinical psychologist specializing in cognitive behavioral therapy for anxiety, depression, and workplace burnout. Over 10 years of experience helping clients build sustainable coping strategies.",
    yearsExperience: 12,
    matchFactors: {
      specialty: 95,
      availability: 90,
      insurance: 100,
      location: 95,
    },
  },
  {
    id: "CL-002",
    name: "Marcus Vance",
    credentials: "LCSW",
    photo: "https://images.unsplash.com",
    specialties: ["Trauma", "Grief", "Relationship Issues"],
    modalities: ["Telehealth"],
    location: "Dallas, TX (75201)",
    acceptedInsurance: ["UnitedHealthcare", "Cigna", "Humana"],
    availabilityState: "limited",
    slotsAvailable: 1,
    rating: 4.8,
    languages: ["English"],
    bio: "Compassionate trauma-informed therapist helping individuals navigate complex PTSD, bereavement, and interpersonal relationships. Employs EMDR and mindfulness-based approaches.",
    yearsExperience: 8,
    matchFactors: {
      specialty: 90,
      availability: 70,
      insurance: 100,
      location: 60,
    },
  },
  {
    id: "CL-003",
    name: "Dr. Elena Rostova",
    credentials: "MD, Board Certified Psychiatrist",
    photo: "https://images.unsplash.com/",
    specialties: ["Anxiety", "Depression", "Bipolar Disorder"],
    modalities: ["In-Person"],
    location: "Austin, TX (78745)",
    acceptedInsurance: ["Blue Cross", "UnitedHealthcare", "Medicare"],
    availabilityState: "closed",
    slotsAvailable: 0,
    rating: 4.7,
    languages: ["English", "Russian"],
    bio: "Board-certified psychiatrist specializing in dual-diagnosis therapy and medication management for mood disorders, severe anxiety, and complex clinical depression cases.",
    yearsExperience: 15,
    matchFactors: {
      specialty: 85,
      availability: 20,
      insurance: 80,
      location: 90,
    },
  },
  {
    id: "CL-004",
    name: "Akiro Tanaka",
    credentials: "LMFT",
    photo: "https://images.unsplash.com/",
    specialties: ["Relationship Issues", "Life Transitions", "Stress Management"],
    modalities: ["Telehealth", "In-Person"],
    location: "Houston, TX (77002)",
    acceptedInsurance: ["Aetna", "Humana", "Blue Cross"],
    availabilityState: "open",
    slotsAvailable: 6,
    rating: 4.9,
    languages: ["English", "Japanese"],
    bio: "Licensed Marriage and Family Therapist focused on family dynamic interventions, career phase transitions, and somatic stress release therapies.",
    yearsExperience: 9,
    matchFactors: {
      specialty: 80,
      availability: 95,
      insurance: 90,
      location: 70,
    },
  },
]

// Preset patient records
export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: "PT-001",
    name: "Jamie Whitaker",
    dob: "1988-11-04",
    sex: "Female",
    status: "Under Review",
    lastUpdated: "2026-05-24T14:32:00Z",
    assignedClinician: "Dr. Sarah Jenkins",
    email: "jamie.whitaker@example.com",
    intakeData: {
      legalFirstName: "Jamie",
      legalLastName: "Whitaker",
      dateOfBirth: "1988-11-04",
      phone: "(512) 555-0199",
      email: "jamie.whitaker@example.com",
      genderIdentity: "Female",
      pronouns: "she/her",
      emergencyContactName: "Robert Whitaker",
      emergencyContactRelationship: "Spouse",
      emergencyContactPhone: "(512) 555-0198",
      chiefComplaint: "Experiencing high-intensity anxiety symptoms at work and home. Trouble sleeping and staying focused during stressful meetings. Looking for mindfulness or somatic practices to cope.",
      presentingIssues: ["Anxiety", "Stress Management", "Burnout"],
      treatmentGoals: "Learn coping mechanisms for sudden panic, improve work-life boundaries, and get better sleep hygiene.",
      goalAreas: ["Coping Skills", "Emotional Regulation", "Symptom Reduction"],
      gad7Answers: [2, 3, 2, 2, 1, 2, 3], // Total 15: Severe Anxiety
      phq9Answers: [1, 2, 1, 1, 0, 1, 1, 0, 0], // Total 7: Mild Depression
      priorTherapy: true,
      priorTherapyDetails: "Attended cognitive behavioral therapy in 2022 for generalized anxiety; found it helpful but looking for somatic integration this time.",
      currentMedications: "Melatonin 5mg at bedtime",
      medicalHistory: "Diagnosed with generalized anxiety in 2021. Otherwise healthy, regular runner.",
      modality: "Telehealth",
      zipCode: "78701",
      languages: ["English"],
      therapistGender: "Female",
      culturalNotes: "Prefers a therapist who understands corporate burnout stresses and high-stress environments.",
      insuranceProvider: "Blue Cross",
      insurancePlanType: "PPO",
      insuranceMemberId: "BCX987654321",
      availability: {
        "Monday-morning": true,
        "Wednesday-afternoon": true,
        "Friday-morning": true,
      },
      sessionFrequency: "Weekly",
    },
  },
  {
    id: "PT-002",
    name: "Morgan Vance",
    dob: "1995-02-17",
    sex: "Non-binary",
    status: "Draft",
    lastUpdated: "2026-05-23T18:15:00Z",
    assignedClinician: "—",
    email: "morgan.v@example.com",
    intakeData: {
      legalFirstName: "Morgan",
      legalLastName: "Vance",
      dateOfBirth: "1995-02-17",
      phone: "(214) 555-0244",
      email: "morgan.v@example.com",
      genderIdentity: "Non-binary",
      pronouns: "they/them",
      emergencyContactName: "Taylor Vance",
      emergencyContactRelationship: "Sibling",
      emergencyContactPhone: "(214) 555-0245",
      chiefComplaint: "Struggling with grief after losing a close relative. Struggling to process feelings and maintain routines.",
      presentingIssues: ["Grief", "Depression"],
      treatmentGoals: "Process complex bereavement feelings and establish sustainable self-care schedules.",
      goalAreas: ["Coping Skills", "Personal Growth"],
      gad7Answers: Array(7).fill(null), // Blank / Empty screening
      phq9Answers: Array(9).fill(null), // Blank / Empty screening
      priorTherapy: false,
      priorTherapyDetails: "",
      currentMedications: "None",
      medicalHistory: "No major chronic illnesses.",
      modality: "Telehealth",
      zipCode: "",
      languages: ["English"],
      therapistGender: "",
      culturalNotes: "",
      insuranceProvider: "Cigna",
      insurancePlanType: "HMO",
      insuranceMemberId: "CGN44332211",
      availability: {
        "Tuesday-afternoon": true,
        "Thursday-afternoon": true,
      },
      sessionFrequency: "Bi-weekly",
    },
  },
  {
    id: "PT-003",
    name: "Alexander Mercer",
    dob: "1974-08-25",
    sex: "Male",
    status: "Active",
    lastUpdated: "2026-05-24T11:00:00Z",
    assignedClinician: "Dr. Elena Rostova",
    email: "alexander.m@example.com",
    intakeData: {
      legalFirstName: "Alexander",
      legalLastName: "Mercer",
      dateOfBirth: "1974-08-25",
      phone: "(713) 555-0782",
      email: "alexander.m@example.com",
      genderIdentity: "Male",
      pronouns: "he/him",
      emergencyContactName: "Janet Mercer",
      emergencyContactRelationship: "Mother",
      emergencyContactPhone: "(713) 555-0783",
      chiefComplaint: "Managing chronic mild depression and life transition questions as children move away. Looking for in-person psychiatric management.",
      presentingIssues: ["Depression", "Life Transitions"],
      treatmentGoals: "Review current antidepressants, establish grounding routines, and talk through life shift questions.",
      goalAreas: ["Self-Esteem", "Personal Growth"],
      gad7Answers: [1, 1, 0, 1, 0, 1, 0], // Total 4: Normal/Minimal Anxiety
      phq9Answers: [2, 2, 2, 1, 1, 2, 1, 0, 0], // Total 11: Moderate Depression
      priorTherapy: true,
      priorTherapyDetails: "On stable medications for 5 years, regular checks with previous provider who retired.",
      currentMedications: "Escitalopram 10mg daily",
      medicalHistory: "Mild depression diagnosed 2018.",
      modality: "In-Person",
      zipCode: "78745",
      languages: ["English"],
      therapistGender: "",
      culturalNotes: "",
      insuranceProvider: "UnitedHealthcare",
      insurancePlanType: "PPO",
      insuranceMemberId: "UHC11223344",
      availability: {
        "Tuesday-evening": true,
        "Thursday-evening": true,
      },
      sessionFrequency: "Flexible",
    },
  },
  {
    id: "PT-004",
    name: "Clara Harrison",
    dob: "2001-05-12",
    sex: "Female",
    status: "Matched",
    lastUpdated: "2026-05-24T17:45:00Z",
    assignedClinician: "Marcus Vance",
    email: "clara.h@example.com",
    intakeData: {
      legalFirstName: "Clara",
      legalLastName: "Harrison",
      dateOfBirth: "2001-05-12",
      phone: "(512) 555-0610",
      email: "clara.h@example.com",
      genderIdentity: "Female",
      pronouns: "she/her",
      emergencyContactName: "David Harrison",
      emergencyContactRelationship: "Father",
      emergencyContactPhone: "(512) 555-0611",
      chiefComplaint: "Struggling with relationship issues and transition to graduate school. High anxiety in social situations.",
      presentingIssues: ["Relationship Issues", "Anxiety", "Life Transitions"],
      treatmentGoals: "Understand attachment patterns, gain confidence in social settings, and navigate school transition stress.",
      goalAreas: ["Communication", "Self-Esteem", "Coping Skills"],
      gad7Answers: [2, 2, 2, 2, 1, 1, 2], // Total 12: Moderate Anxiety
      phq9Answers: [2, 1, 2, 2, 1, 1, 1, 0, 0], // Total 10: Moderate Depression
      priorTherapy: false,
      priorTherapyDetails: "",
      currentMedications: "None",
      medicalHistory: "No major issues.",
      modality: "Telehealth",
      zipCode: "",
      languages: ["English", "Spanish"],
      therapistGender: "Male",
      culturalNotes: "",
      insuranceProvider: "Cigna",
      insurancePlanType: "PPO",
      insuranceMemberId: "CGN88776655",
      availability: {
        "Monday-afternoon": true,
        "Tuesday-afternoon": true,
        "Thursday-afternoon": true,
      },
      sessionFrequency: "Weekly",
    },
  },
]
