"use client"

import { useMemo, useState } from "react"
import { IncidentHistory } from "@/components/status/incident-history"
import { statusLabels, type Incident } from "@/lib/status-data"

type SeverityFilter = Incident["severity"] | "all"
type ViewMode = "timeline" | "list"

const severityOptions: { id: SeverityFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "outage", label: statusLabels.outage },
  { id: "degraded", label: statusLabels.degraded },
  { id: "maintenance", label: statusLabels.maintenance },
]

const severityColor: Record<Incident["severity"], string> = {
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "oklch(0.7 0.14 245)",
}

function monthName(month: number): string {
  const label = new Date(2000, month - 1, 1).toLocaleDateString("pt-BR", { month: "long" })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number)
  return `${monthName(m)} de ${y}`
}

function dayLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

/** Botão de opção compartilhado por todos os grupos de filtro. */
function FilterOption({
  active,
  label,
  onSelect,
}: {
  active: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`type-micro border-b pb-1 transition-colors ${
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-subtle-foreground/60 hover:text-muted-foreground"
      }`}
    >
      {label}
    </button>
  )
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
      <legend className="type-micro float-left mr-6 w-20 text-subtle-foreground/60">{legend}</legend>
      {children}
    </fieldset>
  )
}

export function IncidentFilter({ incidents, months }: { incidents: Incident[]; months: string[] }) {
  const [severity, setSeverity] = useState<SeverityFilter>("all")
  const [service, setService] = useState<string>("all")
  const [year, setYear] = useState<string>("all")
  const [month, setMonth] = useState<string>("all")
  const [view, setView] = useState<ViewMode>("timeline")

  const services = useMemo(
    () =>
      Array.from(new Set(incidents.flatMap((incident) => incident.affected))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [incidents],
  )

  // Anos e meses disponíveis vêm da janela de meses exibida.
  const years = useMemo(
    () => Array.from(new Set(months.map((key) => key.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [months],
  )

  const monthOptions = useMemo(() => {
    const scoped = year === "all" ? months : months.filter((key) => key.startsWith(`${year}-`))
    return Array.from(new Set(scoped.map((key) => key.slice(5, 7)))).sort()
  }, [months, year])

  const filtered = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          (severity === "all" || incident.severity === severity) &&
          (service === "all" || incident.affected.includes(service)) &&
          (year === "all" || incident.date.slice(0, 4) === year) &&
          (month === "all" || incident.date.slice(5, 7) === month),
      ),
    [incidents, severity, service, year, month],
  )

  const isFiltered = severity !== "all" || service !== "all" || year !== "all" || month !== "all"

  const byMonth = useMemo(() => {
    const scoped = months.filter(
      (key) =>
        (year === "all" || key.startsWith(`${year}-`)) && (month === "all" || key.slice(5, 7) === month),
    )
    const map = new Map<string, Incident[]>(scoped.map((key) => [key, []]))
    for (const incident of filtered) {
      const key = incident.date.slice(0, 7)
      if (map.has(key)) map.get(key)!.push(incident)
    }
    // Com filtro ativo, meses sem correspondência não são exibidos.
    return Array.from(map.entries()).filter(([, list]) => !isFiltered || list.length > 0)
  }, [filtered, months, year, month, isFiltered])

  // Listagem plana, do mais recente ao mais antigo.
  const listed = useMemo(
    () => [...filtered].sort((a, b) => b.date.localeCompare(a.date)),
    [filtered],
  )

  function selectYear(next: string) {
    setYear(next)
    // Um mês selecionado pode não existir no novo ano; volta para "Todos".
    if (next !== "all" && month !== "all" && !months.includes(`${next}-${month}`)) setMonth("all")
  }

  function clearFilters() {
    setSeverity("all")
    setService("all")
    setYear("all")
    setMonth("all")
  }

  return (
    <div>
      {/* Controles de filtro */}
      <div className="mt-10 flex flex-col gap-5 border-y border-border py-5">
        <FilterGroup legend="Severidade">
          {severityOptions.map((option) => (
            <FilterOption
              key={option.id}
              active={severity === option.id}
              label={option.label}
              onSelect={() => setSeverity(option.id)}
            />
          ))}
        </FilterGroup>

        <FilterGroup legend="Serviço">
          <FilterOption active={service === "all"} label="Todos" onSelect={() => setService("all")} />
          {services.map((name) => (
            <FilterOption
              key={name}
              active={service === name}
              label={name}
              onSelect={() => setService(name)}
            />
          ))}
        </FilterGroup>

        <FilterGroup legend="Ano">
          <FilterOption active={year === "all"} label="Todos" onSelect={() => selectYear("all")} />
          {years.map((value) => (
            <FilterOption
              key={value}
              active={year === value}
              label={value}
              onSelect={() => selectYear(value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup legend="Mês">
          <FilterOption active={month === "all"} label="Todos" onSelect={() => setMonth("all")} />
          {monthOptions.map((value) => (
            <FilterOption
              key={value}
              active={month === value}
              label={monthName(Number(value))}
              onSelect={() => setMonth(value)}
            />
          ))}
        </FilterGroup>
      </div>

      {/* Resumo do resultado e modo de listagem */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p aria-live="polite" className="type-micro text-subtle-foreground">
            {filtered.length} de {incidents.length} {incidents.length === 1 ? "incidente" : "incidentes"}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className="type-micro text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="flex items-baseline gap-x-6">
          <FilterOption
            active={view === "timeline"}
            label="Timeline"
            onSelect={() => setView("timeline")}
          />
          <FilterOption active={view === "list"} label="Listagem" onSelect={() => setView("list")} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="type-body mt-8 border-y border-border py-6 text-muted-foreground">
          Nenhum incidente corresponde aos filtros selecionados.
        </p>
      ) : view === "list" ? (
        <ul className="mt-10 flex flex-col border-t border-border">
          {listed.map((incident) => (
            <li
              key={`${incident.date}-${incident.title}`}
              className="grid gap-x-6 gap-y-2 border-b border-border py-4 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-baseline"
            >
              <time className="type-label text-subtle-foreground" dateTime={incident.date}>
                {dayLabel(incident.date)}
              </time>
              <div className="flex min-w-0 items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: severityColor[incident.severity] }}
                />
                <div className="min-w-0">
                  <p className="type-body text-foreground">{incident.title}</p>
                  <p className="type-micro mt-1 text-subtle-foreground/60">
                    {incident.affected.join(" · ")}
                  </p>
                </div>
              </div>
              <p className="type-micro text-subtle-foreground md:text-right">
                {statusLabels[incident.severity]} · {incident.duration}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 flex flex-col gap-14">
          {byMonth.map(([key, monthIncidents]) => (
            <section key={key} aria-label={monthLabel(key)}>
              <h2 className="type-micro border-b border-foreground/20 pb-3 text-subtle-foreground">
                {monthLabel(key)}
              </h2>
              {monthIncidents.length > 0 ? (
                <IncidentHistory incidents={monthIncidents} />
              ) : (
                <p className="type-caption border-b border-border py-5 text-subtle-foreground/60">
                  Nenhum incidente reportado.
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
