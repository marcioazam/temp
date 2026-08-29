import { ShieldCheck } from "lucide-react"

export function IncidentEmptyState({
  title = "Tudo funcionando normalmente",
  description = "Nenhum incidente reportado neste período.",
  compact = false,
}: {
  title?: string
  description?: string
  compact?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-4 border-b border-border ${compact ? "py-5" : "py-8"}`}
      role="status"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-term-success">
        <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </div>
      <div className="flex min-w-0 translate-y-1 flex-col gap-1">
        <p className="type-label text-foreground">{title}</p>
        <p className="type-caption text-subtle-foreground/60">{description}</p>
      </div>
    </div>
  )
}
