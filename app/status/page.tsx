import type { Metadata } from "next"
import { IncidentHistory } from "@/components/status/incident-history"
import { LastUpdated } from "@/components/status/last-updated"
import { StatusNav } from "@/components/status/status-nav"
import { StatusSiteLink } from "@/components/status/site-link"
import { UptimeViews } from "@/components/status/uptime-views"
import { RotorMark } from "@/components/logo"
import { getIncidents, getStatusServices } from "@/lib/status-data"

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
        <div className="flex items-center gap-4">
          <LastUpdated />
          <StatusSiteLink />
        </div>
      </header>

      <div className="mt-10">
        <StatusNav />
      </div>

      {/* Estado geral: único elemento cromático da página */}
      <section aria-labelledby="status-geral" className="mt-12">
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
        <div className="border-b border-foreground/20 pb-4">
          <h2 id="servicos" className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Serviços
          </h2>
        </div>

        <UptimeViews services={services} />
      </section>

      {/* Histórico de incidentes */}
      <section aria-labelledby="incidentes" className="mt-14">
        <h2
          id="incidentes"
          className="border-b border-foreground/20 pb-4 font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl"
        >
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
