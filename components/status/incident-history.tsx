import { statusLabels, type Incident } from "@/lib/status-data"

const severityColor: Record<Incident["severity"], string> = {
  degraded: "var(--primary)",
  outage: "var(--destructive)",
  maintenance: "var(--primary)",
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
        <li key={`${incident.date}-${incident.title}`} className="border-b border-border py-6">
          <article>
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="flex min-w-0 items-baseline gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 self-start rounded-full"
                  style={{ background: severityColor[incident.severity] }}
                />
                <h3
                  className="type-subheading"
                  style={{ color: severityColor[incident.severity] }}
                >
                  {incident.title}
                </h3>
              </div>
              <p className="type-micro shrink-0 text-subtle-foreground/70">
                {formatDate(incident.date)} · {incident.duration} · {incident.affected.join(", ")}
              </p>
            </div>

            <ol className="flex flex-col gap-3 pl-4">
              {incident.updates.map((update) => (
                <li key={`${update.time}-${update.label}`} className="flex gap-4">
                  <p className="type-label w-14 shrink-0 text-subtle-foreground">{update.time}</p>
                  <p className="type-caption max-w-2xl text-muted-foreground">
                    <span className="type-label text-foreground">{update.label}</span>
                    <span aria-hidden="true" className="mx-2 text-border">
                      —
                    </span>
                    {update.body}
                  </p>
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
