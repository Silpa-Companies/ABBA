import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-foreground text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}
