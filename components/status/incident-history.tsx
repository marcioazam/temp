import { statusLabels, type Incident } from "@/lib/status-data"

const severityColor: Record<Incident["severity"], string> = {
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "var(--muted-foreground)",
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function IncidentHistory({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <p className="type-body border border-border bg-card px-5 py-6 text-muted-foreground">
        Nenhum incidente registrado nos últimos 90 dias.
      </p>
    )
  }

  return (
    <ol className="flex flex-col gap-10">
      {incidents.map((incident) => (
        <li key={`${incident.date}-${incident.title}`}>
          <p className="type-micro text-subtle-foreground">{formatDate(incident.date)}</p>

          <article className="mt-3 border border-border bg-card">
            <header className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0"
                  style={{ background: severityColor[incident.severity] }}
                />
                <h3 className="type-subheading text-foreground">{incident.title}</h3>
              </div>
              <p className="type-micro text-subtle-foreground">
                {statusLabels[incident.severity]} · {incident.duration}
              </p>
            </header>

            <div className="px-5 py-4">
              <p className="type-micro text-subtle-foreground">
                Afetou: {incident.affected.join(", ")}
              </p>

              <ol className="mt-4 flex flex-col gap-4 border-l border-border pl-4">
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
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
