"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Activity,
  Target,
  Video,
  MapPin,
  Globe,
  Shield,
  Info,
  Save,
  Calendar as CalendarIcon,
  Monitor,
  Link as LinkIcon,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClientAction, updateClientAction } from "@/app/actions/clients";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { client_profileModel as client_profile } from "@/generated/prisma/models/client_profile";
import { PatientStatus } from "@/generated/prisma/enums";

const STEPS = [
  { id: 1, title: "Demographics" },
  { id: 2, title: "Clinical Profile" },
  { id: 3, title: "Preferences" },
  { id: 4, title: "Review" },
];

const ISSUES = ["Anxiety", "Depression", "Trauma", "Burnout", "Sleep Issues"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PERIODS = ["Morning", "Afternoon", "Evening"];

const DRAFT_KEY = "new_patient_intake_draft";

export default function IntakeModal({
  patient = null,
  mode = "create",
  open = false,
  onOpenChange,
}: {
  patient?: client_profile | null;
  mode?: "create" | "edit" | "view";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: undefined as Date | undefined,
    phone: "",
    email: "",
    gender: "",
    pronouns: "",
    reasonForCare: "",
    presentingIssues: [] as string[],
    patientGoals: "",
    goalAreas: [] as string[],
    modality: "Telehealth",
    location: "",
    telehealthLink: "",
    language: "",
    therapistGender: "",
    insuranceProvider: "",
    planType: "",
    memberId: "",
    availability: [] as string[],
  });

  useEffect(() => {
    if (open) {
      // THE FIX: We use setTimeout to push the state update to the next tick,
      // avoiding React's synchronous cascading render warning entirely.
      const timer = setTimeout(() => {
        if (mode === "view" || mode === "edit") {
          setCurrentStep(mode === "view" ? 4 : 1);
          if (patient) {
            setFormData((prev) => ({
              ...prev,
              firstName: patient.first_name || "",
              lastName: patient.last_name || "",
              dob: patient.dob ? new Date(patient.dob) : undefined,
              gender: patient.gender_identity || "",
              location: patient.location || "",
              language: patient.preferred_language || "",
              modality:
                patient.preferred_modality === "in_person"
                  ? "In-Person"
                  : "Telehealth",
            }));
          }
        } else {
          // Create Mode
          setCurrentStep(1);
          setFormData({
            firstName: "",
            lastName: "",
            dob: undefined,
            phone: "",
            email: "",
            gender: "",
            pronouns: "",
            reasonForCare: "",
            presentingIssues: [],
            patientGoals: "",
            goalAreas: [],
            modality: "Telehealth",
            location: "",
            telehealthLink: "",
            language: "",
            therapistGender: "",
            insuranceProvider: "",
            planType: "",
            memberId: "",
            availability: [],
          });
        }
      }, 0);

      // Clean up the timer to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [open, mode, patient]);

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleArrayItem = (key: keyof typeof formData, item: string) => {
    setFormData((prev) => {
      const currentArray = prev[key] as string[];
      if (currentArray.includes(item)) {
        return { ...prev, [key]: currentArray.filter((i) => i !== item) };
      }
      return { ...prev, [key]: [...currentArray, item] };
    });
  };

  // NEW: Save Draft Logic
  const handleSaveDraft = async () => {
    setIsSaving(true);

    // Call the database, but explicitly mark it as a draft
    const response = await createClientAction({
      firstName: formData.firstName,
      lastName: formData.lastName,
      location: formData.location,
      language: formData.language,
      modality: formData.modality,
      status: PatientStatus.DRAFT,
      dob: formData.dob,
      gender: formData.gender, // <--- The magic word
    });

    if (response.success) {
      toast.success("Draft saved to database!");
      onOpenChange(false);
      router.refresh(); // This will make it instantly appear in your table!
    } else {
      toast.error("Failed to save draft.");
    }

    setIsSaving(false);
  };
  const handleSave = async () => {
    setIsSaving(true);
    if (mode === "create") {
      const response = await createClientAction({
        firstName: formData.firstName,
        lastName: formData.lastName,
        status: PatientStatus.UNDER_REVIEW,
        location: formData.location,
        language: formData.language,
        modality: formData.modality,
        dob: formData.dob,
        gender: formData.gender,
      });

      if (response.success) {
        localStorage.removeItem(DRAFT_KEY);
        toast.success("Profile created successfully!"); // NEW
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error("Failed to create patient profile."); // NEW
      }
    } else if (mode === "edit" && patient) {
      const response = await updateClientAction(patient.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        location: formData.location,
        language: formData.language,
        modality: formData.modality,
        dob: formData.dob,
        gender: formData.gender,
      });

      if (response.success) {
        toast.success("Profile updated successfully!"); // NEW
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error("Failed to update patient profile."); // NEW
      }
    }

    setIsSaving(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Demographics & Identity
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Legal First Name *
                </label>
                <Input
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                  disabled={mode === "view"}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Legal Last Name *
                </label>
                <Input
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col">
                <label className="text-sm font-medium text-zinc-700">
                  Date of Birth *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      disabled={mode === "view"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-zinc-50 border-zinc-200",
                        !formData.dob && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dob ? (
                        format(formData.dob, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob}
                      onSelect={(date) =>
                        setFormData({ ...formData, dob: date })
                      }
                      captionLayout="dropdown"
                      startMonth={new Date(1900, 0)}
                      endMonth={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                  disabled={mode === "view"}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Gender Identity
                </label>
                <Input
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="space-y-1.5 w-1/2 pr-2">
              <label className="text-sm font-medium text-zinc-700">
                Pronouns
              </label>
              <Input
                placeholder="e.g. they/them, she/her"
                value={formData.pronouns}
                onChange={(e) =>
                  setFormData({ ...formData, pronouns: e.target.value })
                }
                className="bg-zinc-50 border-zinc-200"
                disabled={mode === "view"}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Activity className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Presenting Problem
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Primary reason the patient is seeking care
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Reason for seeking care
                </label>
                <textarea
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-3 min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:opacity-75"
                  placeholder="e.g., anxiety, burnout, sleep issues..."
                  value={formData.reasonForCare}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setFormData({ ...formData, reasonForCare: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Common Presenting Issues{" "}
                  <span className="text-zinc-400 normal-case font-normal ml-1">
                    (select all that apply)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {ISSUES.map((issue) => (
                    <button
                      key={`issue-${issue}`}
                      disabled={mode === "view"}
                      onClick={() => toggleArrayItem("presentingIssues", issue)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-80 ${formData.presentingIssues.includes(issue) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Target className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Treatment Goals
                  </h4>
                  <p className="text-xs text-zinc-500">
                    What the patient hopes to achieve through care
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Patient&apos;s Goals{" "}
                  <span className="text-zinc-400 normal-case font-normal ml-1">
                    (in their own words)
                  </span>
                </label>
                <textarea
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-3 min-h-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:opacity-75"
                  placeholder='What does the patient hope to achieve? e.g., "I want to manage daily anxiety..."'
                  value={formData.patientGoals}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setFormData({ ...formData, patientGoals: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Suggested Goal Areas{" "}
                  <span className="text-zinc-400 normal-case font-normal ml-1">
                    (select all that apply)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {ISSUES.map((issue) => (
                    <button
                      key={`goal-${issue}`}
                      disabled={mode === "view"}
                      onClick={() => toggleArrayItem("goalAreas", issue)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-80 ${formData.goalAreas.includes(issue) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-zinc-200 rounded-lg p-6 bg-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Monitor className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Care Modality
                  </h4>
                  <p className="text-xs text-zinc-500">
                    How does the patient prefer to receive care?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() =>
                    mode !== "view" &&
                    setFormData({ ...formData, modality: "Telehealth" })
                  }
                  className={`p-5 rounded-lg transition-all border-2 relative ${mode !== "view" ? "cursor-pointer" : ""} ${formData.modality === "Telehealth" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}
                >
                  <div
                    className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 ${formData.modality === "Telehealth" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}
                  />
                  <div
                    className={`p-2 rounded-md mb-3 inline-block ${formData.modality === "Telehealth" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
                  >
                    <Video className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-zinc-900 mb-1">
                    Telehealth
                  </h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Video or phone sessions from any location. Maximum
                    flexibility for the patient.
                  </p>
                </div>

                <div
                  onClick={() =>
                    mode !== "view" &&
                    setFormData({ ...formData, modality: "In-Person" })
                  }
                  className={`p-5 rounded-lg transition-all border-2 relative ${mode !== "view" ? "cursor-pointer" : ""} ${formData.modality === "In-Person" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}
                >
                  <div
                    className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 ${formData.modality === "In-Person" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}
                  />
                  <div
                    className={`p-2 rounded-md mb-3 inline-block ${formData.modality === "In-Person" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="font-semibold text-zinc-900 mb-1">
                    In-Person
                  </h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Face-to-face sessions at a clinic or office. Preferred for
                    hands-on care.
                  </p>
                </div>
              </div>

              {formData.modality === "Telehealth" ? (
                <div className="space-y-1.5 pt-5 mt-5 border-t border-zinc-100">
                  <label className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-zinc-500" /> Link
                  </label>
                  <Input
                    value={formData.telehealthLink}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telehealthLink: e.target.value,
                      })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
              ) : (
                <div className="space-y-1.5 pt-5 mt-5 border-t border-zinc-100">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-zinc-500" /> Preferred
                    Location or Zip Code
                  </label>
                  <Input
                    value={formData.location}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
              )}
            </div>

            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Globe className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Language & Cultural Preference
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Match the patient with a culturally competent clinician.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Preferred Language(s)
                  </label>
                  <Input
                    placeholder="Select languages..."
                    disabled={mode === "view"}
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Therapist Gender Preference{" "}
                    <span className="text-zinc-400 normal-case font-normal ml-1">
                      Optional
                    </span>
                  </label>
                  <Input
                    value={formData.therapistGender}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        therapistGender: e.target.value,
                      })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
              </div>
            </div>

            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Shield className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Validated Screening Tools
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Used to verify in-network clinician availability.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Insurance Provider
                  </label>
                  <Input
                    value={formData.insuranceProvider}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceProvider: e.target.value,
                      })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Plan Type
                  </label>
                  <Input
                    value={formData.planType}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({ ...formData, planType: e.target.value })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Member ID
                  </label>
                  <Input
                    value={formData.memberId}
                    disabled={mode === "view"}
                    onChange={(e) =>
                      setFormData({ ...formData, memberId: e.target.value })
                    }
                    className="bg-zinc-50 border-zinc-200"
                  />
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4 flex gap-3 mt-2">
                <div className="text-zinc-400 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We verify in-network availability before matching. Patients
                  will only be matched with clinicians covered under their plan.
                  Self-pay options are available if preferred.
                </p>
              </div>
            </div>

            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <CalendarIcon className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Weekly Availability Calendar
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Select day and time blocks suitable for therapist sessions
                    (toggable cards.)
                  </p>
                </div>
              </div>

              <div className="w-full border border-zinc-200 rounded-md overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200 text-xs font-semibold text-zinc-900">
                    <tr>
                      <th className="p-3 w-32">Period</th>
                      {DAYS.map((day) => (
                        <th key={day} className="p-3 text-center">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {PERIODS.map((period) => (
                      <tr key={period} className="bg-white">
                        <td className="p-3 font-medium text-zinc-700 bg-zinc-50/50">
                          {period}
                        </td>
                        {DAYS.map((day) => {
                          const slotKey = `${day}-${period}`;
                          const isSelected =
                            formData.availability.includes(slotKey);
                          return (
                            <td
                              key={slotKey}
                              className="p-1.5 border-l border-zinc-200"
                            >
                              <button
                                disabled={mode === "view"}
                                onClick={() =>
                                  toggleArrayItem("availability", slotKey)
                                }
                                className={`w-full h-10 rounded-md transition-colors disabled:opacity-80 ${
                                  isSelected
                                    ? "bg-zinc-900 text-white"
                                    : "bg-white hover:bg-zinc-100"
                                }`}
                                aria-label={`Select ${period} on ${day}`}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                Review Patient Profile
              </h3>
              <p className="text-sm text-zinc-500 mb-6">
                Please verify the information below before finalizing the
                intake.
              </p>

              <div className="space-y-8">
                {/* 1. Demographics Summary */}
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
                    <h4 className="font-semibold text-zinc-900 text-sm">
                      1. Demographics
                    </h4>
                    {mode !== "view" && (
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Edit2 className="w-3 h-3 mr-1" /> Edit
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Full Name
                      </span>
                      {formData.firstName || "—"} {formData.lastName}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Date of Birth
                      </span>
                      {formData.dob ? format(formData.dob, "PPP") : "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Contact Info
                      </span>
                      {formData.email || "No email"} •{" "}
                      {formData.phone || "No phone"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Identity
                      </span>
                      {formData.gender || "—"}{" "}
                      {formData.pronouns ? `(${formData.pronouns})` : ""}
                    </div>
                  </div>
                </div>

                {/* 2. Clinical Profile Summary */}
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
                    <h4 className="font-semibold text-zinc-900 text-sm">
                      2. Clinical Profile
                    </h4>
                    {mode !== "view" && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Edit2 className="w-3 h-3 mr-1" /> Edit
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-y-4 text-sm">
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Reason for Care
                      </span>
                      {formData.reasonForCare || "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Presenting Issues
                      </span>
                      {formData.presentingIssues.length > 0
                        ? formData.presentingIssues.join(", ")
                        : "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Patient&apos;s Goals
                      </span>
                      {formData.patientGoals || "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Suggested Goal Areas
                      </span>
                      {formData.goalAreas.length > 0
                        ? formData.goalAreas.join(", ")
                        : "—"}
                    </div>
                  </div>
                </div>

                {/* 3. Preferences Summary */}
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
                    <h4 className="font-semibold text-zinc-900 text-sm">
                      3. Preferences & Constraints
                    </h4>
                    {mode !== "view" && (
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Edit2 className="w-3 h-3 mr-1" /> Edit
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Modality
                      </span>
                      {formData.modality}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        {formData.modality === "Telehealth"
                          ? "Telehealth Link"
                          : "Preferred Location"}
                      </span>
                      {formData.modality === "Telehealth"
                        ? formData.telehealthLink || "—"
                        : formData.location || "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Language
                      </span>
                      {formData.language || "—"}
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Insurance
                      </span>
                      {formData.insuranceProvider || "Self-Pay"}{" "}
                      {formData.planType ? `(${formData.planType})` : ""}
                    </div>
                    <div className="col-span-2">
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                        Availability
                      </span>
                      {formData.availability.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.availability.map((slot) => (
                            <span
                              key={slot}
                              className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs border border-zinc-200"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 flex items-start justify-center z-50 backdrop-blur-sm overflow-y-auto py-10">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl relative flex flex-col my-auto">
        <div className="p-8 border-b border-zinc-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900">
                {mode === "create"
                  ? "New Patient Intake"
                  : mode === "edit"
                    ? "Edit Patient Profile"
                    : "View Patient Profile"}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                {mode === "view"
                  ? "Reviewing records for this client."
                  : "Help us find the best-fit clinician for this patient."}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between w-full max-w-2xl mx-auto relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-zinc-200 -z-10" />
            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isPassed = step.id < currentStep;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-2 bg-white px-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-zinc-900 text-white"
                        : isPassed
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                      Step {step.id}
                    </span>
                    <span
                      className={`text-xs font-medium ${isActive ? "text-zinc-900" : "text-zinc-500"}`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 min-h-[400px] bg-zinc-50/30">
          {renderStepContent()}
        </div>

        <div className="p-6 border-t border-zinc-100 bg-white flex items-center justify-between rounded-b-xl">
          <span className="text-sm text-zinc-500">
            Step {currentStep} of {STEPS.length}
          </span>

          <div className="flex gap-3">
            {currentStep > 1 && mode !== "view" && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="bg-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}

            <div className="flex gap-2">
              {mode === "create" && (
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="bg-white text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
              )}

              {mode === "edit" && (
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-white text-zinc-700 transition-colors hover:bg-zinc-100"
                >
                  Cancel
                </Button>
              )}

              {mode === "view" ? (
                <Button
                  onClick={() => onOpenChange(false)}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  Close Summary
                </Button>
              ) : currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  {isSaving
                    ? "Saving..."
                    : mode === "edit"
                      ? "Save Changes"
                      : "Complete Profile"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
