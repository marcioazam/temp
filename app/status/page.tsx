import type { Metadata } from "next"
import { IncidentHistory } from "@/components/status/incident-history"
import { UptimeBar } from "@/components/status/uptime-bar"
import { RotorMark } from "@/components/logo"
import { getIncidents, getStatusServices, statusLabels } from "@/lib/status-data"

export const metadata: Metadata = {
  title: "Status | Nylla",
  description:
    "Status em tempo real da plataforma Nylla: disponibilidade do Gateway API, roteamento de modelos, streaming, dashboard e autenticação.",
}

const legend = [
  { label: "Operacional", color: "var(--term-success)" },
  { label: "Degradado", color: "var(--primary)" },
  { label: "Interrupção", color: "var(--destructive)" },
  { label: "Manutenção", color: "var(--muted-foreground)" },
]

export default function StatusPage() {
  const now = new Date()
  const services = getStatusServices(now)
  const incidents = getIncidents(now)
  const overallStatus = services.some((service) => service.status === "outage")
    ? "outage"
    : services.some((service) => service.status === "degraded" || service.status === "maintenance")
      ? "degraded"
      : "operational"
  const overallState = {
    operational: {
      label: "Todos os sistemas operacionais",
      background: "var(--term-success)",
    },
    degraded: {
      label: "Desempenho degradado",
      background: "var(--primary)",
    },
    outage: {
      label: "Interrupção em andamento",
      background: "var(--destructive)",
    },
  }[overallStatus]

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 pb-24 pt-8 md:px-9 md:pt-10">
      <div className="flex items-center gap-4 text-foreground" aria-label="Nylla Status">
        <RotorMark aria-hidden="true" className="h-10 w-10 shrink-0 text-primary" />
        <span className="type-wordmark text-3xl">Nylla Status</span>
      </div>

      {/* Estado geral */}
      <section aria-labelledby="status-geral" className="mt-16 md:mt-20">
        <div
          className="px-5 py-4 text-background md:px-6 md:py-5"
          style={{ background: overallState.background }}
        >
          <h1 id="status-geral" className="type-title text-background">
            {overallState.label}
          </h1>
        </div>
        <p className="type-lead mt-4 max-w-xl text-muted-foreground">
          Disponibilidade da plataforma Nylla nos últimos 90 dias, atualizada continuamente.
        </p>
      </section>

      {/* Serviços */}
      <section aria-labelledby="servicos" className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="servicos" className="type-micro text-subtle-foreground">
            Serviços · 90 dias
          </h2>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legend.map((item) => (
              <li key={item.label} className="type-micro flex items-center gap-1.5 text-subtle-foreground">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5" style={{ background: item.color }} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-4 border border-border bg-card">
          {services.map((service, i) => (
            <li key={service.name} className={i > 0 ? "border-t border-border" : undefined}>
              <div className="px-5 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="type-subheading text-foreground">{service.name}</h3>
                    <p className="type-caption mt-0.5 truncate text-subtle-foreground">{service.description}</p>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-4">
                    <span className="type-label hidden text-muted-foreground sm:inline">
                      {statusLabels[service.status]}
                    </span>
                    <span className="type-label text-foreground">{service.uptime}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <UptimeBar days={service.days} serviceName={service.name} />
                </div>
                <div className="type-micro mt-2 flex justify-between text-subtle-foreground/70">
                  <span>90 dias atrás</span>
                  <span>Hoje</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Histórico de incidentes */}
      <section aria-labelledby="incidentes" className="mt-20">
        <h2 id="incidentes" className="type-micro text-subtle-foreground">
          Incidentes recentes
        </h2>
        <div className="mt-4">
          <IncidentHistory incidents={incidents} />
        </div>
        <p className="type-caption mt-10 text-subtle-foreground">
          Incidentes resolvidos permanecem listados por 90 dias. Dúvidas sobre disponibilidade? Escreva para{" "}
          <a href="mailto:status@nylla.dev" className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground">
            status@nylla.dev
          </a>
          .
        </p>
      </section>
    </main>
  )
}
