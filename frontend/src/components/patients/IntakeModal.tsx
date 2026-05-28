"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientAction } from "@/app/actions/clients";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Demographics" },
  { id: 2, title: "Clinical Profile" },
  { id: 3, title: "Preferences" },
  { id: 4, title: "Review" },
];

const ISSUES = ["Anxiety", "Depression", "Trauma", "Burnout", "Sleep Issues"];

export default function IntakeModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    language: "",
    therapistGender: "",
    insuranceProvider: "",
    planType: "",
    memberId: "",
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const toggleArrayItem = (
    field: "presentingIssues" | "goalAreas",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((i) => i !== value)
        : [...prev[field], value],
    }));
  };

  const handleCreate = async () => {
    setIsSaving(true);
    const response = await createClientAction({
      firstName: formData.firstName,
      lastName: formData.lastName,
      location: formData.location,
      language: formData.language,
      modality: formData.modality,
    });

    if (response.success) {
      setIsOpen(false);
      setCurrentStep(1);
      router.refresh();
    } else {
      alert("Failed to create patient profile.");
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
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Presenting Problem Card */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-3 min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="e.g., anxiety, burnout, sleep issues..."
                  value={formData.reasonForCare}
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
                      onClick={() => toggleArrayItem("presentingIssues", issue)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${formData.presentingIssues.includes(issue) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Treatment Goals Card */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-3 min-h-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder='What does the patient hope to achieve? e.g., "I want to manage daily anxiety..."'
                  value={formData.patientGoals}
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
                      onClick={() => toggleArrayItem("goalAreas", issue)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${formData.goalAreas.includes(issue) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MOVED: Validated Screening Tools (Insurance) */}
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
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Care Modality Card */}
            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Video className="w-5 h-5 text-zinc-700" />
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
                    setFormData({ ...formData, modality: "Telehealth" })
                  }
                  className={`p-5 rounded-lg cursor-pointer transition-all border-2 relative ${formData.modality === "Telehealth" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}
                >
                  <div
                    className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 ${formData.modality === "Telehealth" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}
                  />
                  <Video className="w-6 h-6 mb-3 text-zinc-700" />
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
                    setFormData({ ...formData, modality: "In-Person" })
                  }
                  className={`p-5 rounded-lg cursor-pointer transition-all border-2 relative ${formData.modality === "In-Person" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}
                >
                  <div
                    className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 ${formData.modality === "In-Person" ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}
                  />
                  <MapPin className="w-6 h-6 mb-3 text-zinc-700" />
                  <h5 className="font-semibold text-zinc-900 mb-1">
                    In-Person
                  </h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Face-to-face sessions at a clinic or office. Preferred for
                    hands-on care.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Preferred Location or Zip Code
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="bg-zinc-50 border-zinc-200"
                />
              </div>
            </div>

            {/* Language Preference Card */}
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

            {/* ADDED: Insurance & Payer Card */}
            <div className="border border-zinc-200 rounded-lg p-6 space-y-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-md">
                  <Shield className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm">
                    Insurance & Payer
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
          </div>
        );
      case 4:
        return (
          <div className="p-8 text-center text-zinc-500 animate-in fade-in duration-500">
            Step 4: Review and Submit UI goes here
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm"
      >
        <span className="text-lg leading-none mr-2">+</span> New Patient Intake
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 flex items-start justify-center z-50 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl relative flex flex-col my-auto">
            <div className="p-8 border-b border-zinc-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    New Patient Intake
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Help us find the best-fit clinician for this patient.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
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
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="bg-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="bg-white text-zinc-700">
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                  </Button>

                  {currentStep < STEPS.length ? (
                    <Button
                      onClick={handleNext}
                      className="bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCreate}
                      disabled={isSaving}
                      className="bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      {isSaving ? "Saving..." : "Complete Profile"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
