import type { Metadata } from "next"
import { IncidentHistory } from "@/components/status/incident-history"
import { LastUpdated } from "@/components/status/last-updated"
import { UptimeBar } from "@/components/status/uptime-bar"
import { RotorMark } from "@/components/logo"
import { getIncidents, getStatusServices, statusLabels } from "@/lib/status-data"

export const metadata: Metadata = {
  title: "Status | Nylla",
  description:
    "Status em tempo real da plataforma Nylla: disponibilidade do Gateway API, roteamento de modelos, streaming, dashboard e autenticação.",
}

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
    operational: { label: "Todos os sistemas operacionais", background: "var(--term-success)" },
    degraded: { label: "Desempenho degradado", background: "var(--primary)" },
    outage: { label: "Interrupção em andamento", background: "var(--destructive)" },
  }[overallStatus]

  // Média das disponibilidades declaradas, no formato pt-BR.
  const averageUptime = `${(
    services.reduce((total, service) => total + Number.parseFloat(service.uptime.replace(",", ".")), 0) /
    services.length
  )
    .toFixed(2)
    .replace(".", ",")}%`

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-10 md:px-9 md:pt-14">
      {/* Cabeçalho do subsite */}
      <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex items-center gap-4 text-foreground">
          <RotorMark aria-hidden="true" className="h-10 w-10 shrink-0 text-primary" />
          <span className="type-wordmark text-3xl">Nylla Status</span>
        </div>
        <LastUpdated />
      </header>

      {/* Estado geral: único elemento cromático da página */}
      <section aria-labelledby="status-geral" className="mt-10">
        <div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 md:px-6"
          style={{ background: overallState.background }}
        >
          <h1 id="status-geral" className="type-subheading text-background">
            {overallState.label}
          </h1>
          <p className="type-label text-background/70">{averageUptime} · 90 dias</p>
        </div>
      </section>

      {/* Serviços */}
      <section aria-labelledby="servicos" className="mt-14">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-3">
          <h2 id="servicos" className="type-micro text-subtle-foreground">
            Serviços
          </h2>
          <p className="type-micro text-subtle-foreground/60">90 dias atrás → hoje</p>
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
                <UptimeBar days={service.days} serviceName={service.name} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Histórico de incidentes */}
      <section aria-labelledby="incidentes" className="mt-14">
        <h2 id="incidentes" className="border-b border-border pb-4 font-mono text-2xl font-medium uppercase tracking-[0.08em] text-background">
          Incidentes recentes
        </h2>
        <IncidentHistory incidents={incidents} />
        <p className="type-caption mt-8 w-full text-subtle-foreground/70">
          Incidentes resolvidos permanecem listados por 90 dias. Dúvidas sobre disponibilidade? Escreva para{" "}
          <a
            href="mailto:status@nylla.dev"
            className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            status@nylla.dev
          </a>
          .
        </p>
      </section>
    </main>
  )
}
