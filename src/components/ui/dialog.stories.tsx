/**
 * @file        dialog.stories.tsx
 * @description Storybook stories for the Dialog component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Dialog, type DialogProps } from "./dialog"
import { Button } from "./button"

const meta = {
  title: "Components/UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
}

export default meta

/**
 * Interactive wrapper to showcase state transitions in Storybook
 */
function DialogWrapper({ open: initialOpen = true, ...props }: Omit<DialogProps, "onOpenChange">) {
  const [open, setOpen] = React.useState(initialOpen)

  React.useEffect(() => {
    setOpen(initialOpen)
  }, [initialOpen])

  return (
    <div className="p-10 border border-dashed border-[var(--color-border)] rounded-xl flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog {...props} open={open} onOpenChange={setOpen} />
    </div>
  )
}

/**
 * Default interactive story
 */
export const Default = {
  render: (args: Omit<DialogProps, "open" | "onOpenChange">) => (
    <DialogWrapper
      {...args}
      open={true}
      title="Intake Form Step 1"
      description="Please complete patient details below."
    >
      <div className="space-y-4">
        <p className="text-sm">This is the interior scrollable content of the dialog window.</p>
        <div className="h-20 bg-muted/30 rounded border border-dashed flex items-center justify-center">
          Demographics Input Fields
        </div>
      </div>
    </DialogWrapper>
  ),
}

/**
 * Loading state showing a spinner overlay
 */
export const Loading = {
  render: (args: Omit<DialogProps, "open" | "onOpenChange">) => (
    <DialogWrapper
      {...args}
      open={true}
      isLoading={true}
      title="Submitting Data..."
      description="Persisting details to care coordination records."
    >
      <div className="h-40 flex items-center justify-center">
        Waiting for submission resolve...
      </div>
    </DialogWrapper>
  ),
}

/**
 * Error state highlighting configuration alert
 */
export const Error = {
  render: (args: Omit<DialogProps, "open" | "onOpenChange">) => (
    <DialogWrapper
      {...args}
      open={true}
      hasError={true}
      title="Validation Failed"
      description="Please check form fields and resubmit."
    >
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-danger-600)] font-medium">
          Error: &quot;Date of Birth&quot; field must represent a past date.
        </p>
      </div>
    </DialogWrapper>
  ),
}

/**
 * Empty / Plain dialog without title or description
 */
export const Empty = {
  render: (args: Omit<DialogProps, "open" | "onOpenChange">) => (
    <DialogWrapper {...args} open={true}>
      <div className="h-32 flex flex-col items-center justify-center text-muted-foreground">
        <p>No header is defined for this dialog instance.</p>
      </div>
    </DialogWrapper>
  ),
}
