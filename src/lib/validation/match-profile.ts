import { z } from "zod"

export const activityLevels = ["sedentary", "light", "moderate", "active"] as const

export const matchProfileSchema = z.object({
  displayName: z.string().min(2, "Add at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  activityLevel: z.enum(activityLevels, {
    error: "Choose an activity level.",
  }),
  goals: z
    .string()
    .min(10, "Share a bit more about your goals (10+ characters).")
    .max(500, "Keep this under 500 characters."),
})

export type MatchProfileValues = z.infer<typeof matchProfileSchema>

export const matchProfileDefaultValues: MatchProfileValues = {
  displayName: "",
  email: "",
  activityLevel: "moderate",
  goals: "",
}
