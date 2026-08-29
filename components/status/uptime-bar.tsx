"use client"

import { useState } from "react"
import { statusLabels, type DayStatus } from "@/lib/status-data"

export interface Segment {
  id: string
  label: string // texto principal do tooltip (data, mês ou hora)
  status: DayStatus
  detail?: string // texto adicional, ex.: uptime do mês
}

const barColor: Record<DayStatus, string> = {
  operational: "var(--term-success)",
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "oklch(0.7 0.14 245)",
}

export function SegmentBar({ segments, ariaLabel }: { segments: Segment[]; ariaLabel: string }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={ariaLabel}
        className="flex h-6 items-stretch gap-px"
        onMouseLeave={() => setActive(null)}
      >
        {segments.map((segment, i) => (
          <span
            key={segment.id}
            onMouseEnter={() => setActive(i)}
            className="min-w-0 flex-1 cursor-default transition-opacity duration-150"
            style={{
              background: barColor[segment.status],
              // Períodos operacionais recuam; anomalias e o período sob o cursor ficam em destaque.
              opacity: active === i ? 1 : segment.status === "operational" ? 0.45 : 0.9,
            }}
          />
        ))}
      </div>

      {active !== null && (
        <div
          className="type-label pointer-events-none absolute -top-8 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-border bg-popover px-2 py-1 text-popover-foreground"
          style={{
            left: `${Math.min(Math.max(((active + 0.5) / segments.length) * 100, 8), 92)}%`,
          }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: barColor[segments[active].status] }}
          />
          <span className="text-subtle-foreground">{segments[active].label}</span>
          <span>{statusLabels[segments[active].status]}</span>
          {segments[active].detail && (
            <span className="text-subtle-foreground">· {segments[active].detail}</span>
          )}
        </div>
      )}
    </div>
  )
}
