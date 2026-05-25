"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { FormSelectField } from "@/components/forms/form-select-field"
import { FormTextField } from "@/components/forms/form-text-field"
import { FormTextareaField } from "@/components/forms/form-textarea-field"
import {
  activityLevels,
  matchProfileDefaultValues,
  matchProfileSchema,
  type MatchProfileValues,
} from "@/lib/validation/match-profile"

const activityOptions = [
  { value: "sedentary", label: "Mostly desk / low movement" },
  { value: "light", label: "Light workouts 1–2× / week" },
  { value: "moderate", label: "Moderate training 3–4× / week" },
  { value: "active", label: "High volume or daily training" },
] as const satisfies ReadonlyArray<{ value: (typeof activityLevels)[number]; label: string }>

export function MatchProfileForm() {
  const form = useForm<MatchProfileValues>({
    resolver: zodResolver(matchProfileSchema),
    defaultValues: matchProfileDefaultValues,
    mode: "onTouched",
  })

  function onSubmit(values: MatchProfileValues) {
    toast.success("Profile looks good (frontend-only demo).", {
      description: JSON.stringify(values, null, 2),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your profile</CardTitle>
        <CardDescription>
          Reusable fields wired with react-hook-form, Zod, and shadcn/ui. No
          backend calls—submit shows a toast with the payload.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-6">
            <FormTextField
              control={form.control}
              name="displayName"
              label="Display name"
              placeholder="How should we refer to you?"
              autoComplete="name"
            />
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              description="Used only in this demo for validation practice."
            />
            <FormSelectField
              control={form.control}
              name="activityLevel"
              label="Activity level"
              description="Helps tailor intensity and volume suggestions."
              options={activityOptions}
            />
            <FormTextareaField
              control={form.control}
              name="goals"
              label="Goals & preferences"
              placeholder="What outcomes matter most? Any constraints we should respect?"
              description="Minimum 10 characters so the form has something meaningful to validate."
            />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3 border-t pt-6">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save profile
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(matchProfileDefaultValues)}
            >
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
