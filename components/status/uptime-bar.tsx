"use client"

import { useState } from "react"
import { statusLabels, type UptimeDay } from "@/lib/status-data"

const barColor: Record<UptimeDay["status"], string> = {
  operational: "var(--term-success)",
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "var(--muted-foreground)",
}

function formatDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function UptimeBar({ days, serviceName }: { days: UptimeDay[]; serviceName: string }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={`Histórico de 90 dias de ${serviceName}`}
        className="flex h-8 items-stretch gap-px"
        onMouseLeave={() => setActive(null)}
      >
        {days.map((day, i) => (
          <span
            key={day.date}
            onMouseEnter={() => setActive(i)}
            className="min-w-0 flex-1 cursor-default transition-opacity"
            style={{
              background: barColor[day.status],
              opacity: active === null || active === i ? (day.status === "operational" ? 0.75 : 1) : 0.25,
            }}
          />
        ))}
      </div>

      {active !== null && (
        <div
          className="type-label pointer-events-none absolute -top-9 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-border bg-popover px-2.5 py-1.5 text-popover-foreground"
          style={{
            left: `${((active + 0.5) / days.length) * 100}%`,
          }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0"
            style={{ background: barColor[days[active].status] }}
          />
          <span className="text-subtle-foreground">{formatDay(days[active].date)}</span>
          <span>{statusLabels[days[active].status]}</span>
        </div>
      )}
    </div>
  )
}
