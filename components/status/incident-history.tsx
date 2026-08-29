import { statusLabels, type Incident } from "@/lib/status-data"

const severityColor: Record<Incident["severity"], string> = {
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "oklch(0.7 0.14 245)",
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function IncidentHistory({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <p className="type-body border-b border-border py-6 text-muted-foreground">
        Nenhum incidente registrado nos últimos 90 dias.
      </p>
    )
  }

  return (
    <ol>
      {incidents.map((incident) => (
        <li key={`${incident.date}-${incident.title}`} className="border-b border-border py-7 md:py-8">
          <article>
            <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: severityColor[incident.severity] }}
                />
                <h3 className="font-sans text-base font-medium tracking-tight text-foreground md:text-lg">
                  {incident.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-5 md:justify-end md:pl-0">
                <span className="type-micro text-subtle-foreground">{formatDate(incident.date)}</span>
                <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-subtle-foreground/50" />
                <span className="type-micro text-subtle-foreground">{incident.duration}</span>
                <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-subtle-foreground/50" />
                <span className="type-micro text-subtle-foreground">{incident.affected.join(" · ")}</span>
              </div>
            </header>

            <ol className="relative mt-7 ml-1 flex flex-col gap-5 border-l border-border pl-7 md:ml-0 md:pl-8">
              {incident.updates.map((update, index) => (
                <li
                  key={`${update.time}-${update.label}`}
                  className="relative grid gap-1 md:grid-cols-[4rem_6.5rem_minmax(0,1fr)] md:items-baseline md:gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[1.95rem] h-1.5 w-1.5 rounded-full bg-subtle-foreground md:-left-[2.2rem]"
                  />
                  <time className="type-label text-subtle-foreground">{update.time}</time>
                  <p className="type-label text-foreground">{update.label}</p>
                  <p className="type-caption min-w-0 text-muted-foreground">{update.body}</p>
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[1.95rem] h-1.5 w-1.5 rounded-full md:-left-[2.2rem]"
                      style={{ background: severityColor[incident.severity] }}
                    />
                  )}
                </li>
              ))}
            </ol>

            <p className="sr-only">Severidade: {statusLabels[incident.severity]}</p>
          </article>
        </li>
      ))}
    </ol>
  )
}
