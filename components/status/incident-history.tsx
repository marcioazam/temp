import { statusLabels, type Incident } from "@/lib/status-data"

const severityColor: Record<Incident["severity"], string> = {
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "var(--muted-foreground)",
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
      <p className="type-body border border-border bg-card px-5 py-6 text-muted-foreground md:px-6">
        Nenhum incidente registrado nos últimos 90 dias.
      </p>
    )
  }

  return (
    <ol className="border border-border bg-card">
      {incidents.map((incident, index) => (
        <li
          key={`${incident.date}-${incident.title}`}
          className={index > 0 ? "border-t border-border" : undefined}
        >
          <article className="px-5 py-5 md:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="flex min-w-0 items-baseline gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 self-start"
                  style={{ background: severityColor[incident.severity] }}
                />
                <h3 className="type-subheading text-foreground">{incident.title}</h3>
              </div>
              <p className="type-micro shrink-0 text-subtle-foreground">
                {formatDate(incident.date)} · {incident.duration}
              </p>
            </div>

            <p className="type-micro mt-2 pl-4 text-subtle-foreground/70">
              {statusLabels[incident.severity]} · {incident.affected.join(", ")}
            </p>

            <ol className="mt-5 flex flex-col gap-4 border-l border-border pl-4">
              {incident.updates.map((update) => (
                <li key={`${update.time}-${update.label}`}>
                  <p className="type-label text-foreground">
                    <span className="text-subtle-foreground">{update.time}</span>
                    <span aria-hidden="true" className="mx-2 text-border">
                      /
                    </span>
                    {update.label}
                  </p>
                  <p className="type-caption mt-1 max-w-2xl text-muted-foreground">{update.body}</p>
                </li>
              ))}
            </ol>
          </article>
        </li>
      ))}
    </ol>
  )
}
