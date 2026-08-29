"use client"

import { useState } from "react"
import { SegmentBar, type Segment } from "@/components/status/uptime-bar"
import { statusLabels, type StatusService } from "@/lib/status-data"

type TabId = "days" | "months" | "hours"

const tabs: { id: TabId; label: string; scale: string }[] = [
  { id: "days", label: "90 dias", scale: "90 dias atrás → hoje" },
  { id: "months", label: "12 meses", scale: "12 meses atrás → hoje" },
  { id: "hours", label: "24 horas", scale: "24 horas atrás → agora" },
]

function formatDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
}

function formatMonth(iso: string): string {
  const [y, m] = iso.split("-").map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
}

function segmentsFor(service: StatusService, tab: TabId): Segment[] {
  if (tab === "months") {
    return service.months.map((month) => ({
      id: month.month,
      label: formatMonth(month.month),
      status: month.status,
      detail: month.uptime,
    }))
  }
  if (tab === "hours") {
    return service.hours.map((hour, i) => ({
      id: `${hour.time}-${i}`,
      label: hour.time,
      status: hour.status,
    }))
  }
  return service.days.map((day) => ({
    id: day.date,
    label: formatDay(day.date),
    status: day.status,
  }))
}

export function UptimeViews({ services }: { services: StatusService[] }) {
  const [tab, setTab] = useState<TabId>("days")
  const activeTab = tabs.find((t) => t.id === tab)!

  return (
    <div>
      {/* Seletor de granularidade + escala temporal */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
        <div role="tablist" aria-label="Período do histórico" className="flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`type-micro border-b pb-1 transition-colors ${
                tab === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-subtle-foreground/60 hover:text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="type-micro text-subtle-foreground/60">{activeTab.scale}</p>
      </div>

      <ul>
        {services.map((service) => (
          <li key={service.name} className="border-b border-border py-5">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="type-subheading truncate text-foreground">{service.name}</h3>
              <div className="flex shrink-0 items-baseline gap-4">
                {service.status !== "operational" && (
                  <span className="type-label text-muted-foreground">{statusLabels[service.status]}</span>
                )}
                <span className="type-label text-subtle-foreground">{service.uptime}</span>
              </div>
            </div>
            <p className="type-caption mt-1 truncate text-subtle-foreground/70">{service.description}</p>
            <div className="mt-4">
              <SegmentBar
                segments={segmentsFor(service, tab)}
                ariaLabel={`Histórico de ${activeTab.label} de ${service.name}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
