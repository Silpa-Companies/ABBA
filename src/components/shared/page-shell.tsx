import { cn } from "@/lib/utils"

type PageShellProps = {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <div
        className={cn(
          "mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
