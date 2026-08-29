"use client"

import { useMemo, useState } from "react"
import { IncidentHistory } from "@/components/status/incident-history"
import { statusLabels, type Incident } from "@/lib/status-data"

type SeverityFilter = Incident["severity"] | "all"

const severityOptions: { id: SeverityFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "outage", label: statusLabels.outage },
  { id: "degraded", label: statusLabels.degraded },
  { id: "maintenance", label: statusLabels.maintenance },
]

function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number)
  const label = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function IncidentFilter({ incidents, months }: { incidents: Incident[]; months: string[] }) {
  const [severity, setSeverity] = useState<SeverityFilter>("all")
  const [service, setService] = useState<string>("all")

  const services = useMemo(
    () =>
      Array.from(new Set(incidents.flatMap((incident) => incident.affected))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [incidents],
  )

  const filtered = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          (severity === "all" || incident.severity === severity) &&
          (service === "all" || incident.affected.includes(service)),
      ),
    [incidents, severity, service],
  )

  const isFiltered = severity !== "all" || service !== "all"

  const byMonth = useMemo(() => {
    const map = new Map<string, Incident[]>(months.map((key) => [key, []]))
    for (const incident of filtered) {
      const key = incident.date.slice(0, 7)
      if (map.has(key)) map.get(key)!.push(incident)
    }
    // Com filtro ativo, meses sem correspondência não são exibidos.
    return Array.from(map.entries()).filter(([, list]) => !isFiltered || list.length > 0)
  }, [filtered, months, isFiltered])

  return (
    <div>
      {/* Controles de filtro */}
      <div className="mt-10 flex flex-col gap-5 border-y border-border py-5">
        <fieldset className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <legend className="type-micro float-left mr-6 w-20 text-subtle-foreground/60">Severidade</legend>
          {severityOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={severity === option.id}
              onClick={() => setSeverity(option.id)}
              className={`type-micro border-b pb-1 transition-colors ${
                severity === option.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-subtle-foreground/60 hover:text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <legend className="type-micro float-left mr-6 w-20 text-subtle-foreground/60">Serviço</legend>
          <button
            type="button"
            aria-pressed={service === "all"}
            onClick={() => setService("all")}
            className={`type-micro border-b pb-1 transition-colors ${
              service === "all"
                ? "border-foreground text-foreground"
                : "border-transparent text-subtle-foreground/60 hover:text-muted-foreground"
            }`}
          >
            Todos
          </button>
          {services.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={service === name}
              onClick={() => setService(name)}
              className={`type-micro border-b pb-1 transition-colors ${
                service === name
                  ? "border-foreground text-foreground"
                  : "border-transparent text-subtle-foreground/60 hover:text-muted-foreground"
              }`}
            >
              {name}
            </button>
          ))}
        </fieldset>
      </div>

      {/* Resumo do resultado */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p aria-live="polite" className="type-micro text-subtle-foreground">
          {filtered.length} de {incidents.length}{" "}
          {incidents.length === 1 ? "incidente" : "incidentes"}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={() => {
              setSeverity("all")
              setService("all")
            }}
            className="type-micro text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="type-body mt-8 border-y border-border py-6 text-muted-foreground">
          Nenhum incidente corresponde aos filtros selecionados.
        </p>
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
