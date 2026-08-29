import type { Metadata } from "next"
import { IncidentHistory } from "@/components/status/incident-history"
import { LastUpdated } from "@/components/status/last-updated"
import { StatusNav } from "@/components/status/status-nav"
import { RotorMark } from "@/components/logo"
import { getIncidentHistory, HISTORY_MONTHS, type Incident } from "@/lib/status-data"

export const metadata: Metadata = {
  title: "Histórico de incidentes | Nylla Status",
  description:
    "Histórico completo de incidentes da plataforma Nylla, agrupado por mês: interrupções, degradações e manutenções programadas.",
}

function monthKey(iso: string): string {
  return iso.slice(0, 7) // yyyy-mm
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number)
  const label = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export default function StatusHistoryPage() {
  const now = new Date()
  const incidents = getIncidentHistory(now)

  // Últimos N meses, do mais recente ao mais antigo, incluindo meses vazios.
  const byMonth = new Map<string, Incident[]>()
  for (let i = 0; i < HISTORY_MONTHS; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    byMonth.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, [])
  }
  for (const incident of incidents) {
    const key = monthKey(incident.date)
    if (byMonth.has(key)) byMonth.get(key)!.push(incident)
  }

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

      <div className="mt-10">
        <StatusNav />
      </div>

      <section aria-labelledby="historico" className="mt-12">
        <h1
          id="historico"
          className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl"
        >
          Histórico de incidentes
        </h1>
        <p className="type-caption mt-3 text-subtle-foreground/70">
          Últimos {HISTORY_MONTHS} meses, do mais recente ao mais antigo.
        </p>

        <div className="mt-12 flex flex-col gap-14">
          {Array.from(byMonth.entries()).map(([key, monthIncidents]) => (
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

        <p className="type-caption mt-10 w-full text-subtle-foreground/70">
          Dúvidas sobre disponibilidade? Escreva para{" "}
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
