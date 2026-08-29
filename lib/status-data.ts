// Dados do subsite de status.
// Histórico determinístico: incidentes ancorados em deslocamentos fixos
// de dias a partir de hoje, para que servidor e cliente rendam o mesmo HTML.

export type DayStatus = "operational" | "degraded" | "outage" | "maintenance"

export interface UptimeDay {
  date: string // ISO yyyy-mm-dd
  status: DayStatus
}

export interface StatusService {
  name: string
  description: string
  status: DayStatus
  uptime: string
  days: UptimeDay[]
}

export interface IncidentUpdate {
  time: string
  label: string
  body: string
}

export interface Incident {
  date: string // ISO yyyy-mm-dd
  title: string
  severity: Exclude<DayStatus, "operational">
  resolved: boolean
  duration: string
  affected: string[]
  updates: IncidentUpdate[]
}

export const DAYS_SHOWN = 90

export const statusLabels: Record<DayStatus, string> = {
  operational: "Operacional",
  degraded: "Desempenho degradado",
  outage: "Interrupção",
  maintenance: "Manutenção",
}

function isoDaysAgo(daysAgo: number, now: Date): string {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

/** Gera a faixa de 90 dias de um serviço com anomalias em dias fixos. */
function buildDays(
  now: Date,
  anomalies: Record<number, DayStatus> = {},
): UptimeDay[] {
  const days: UptimeDay[] = []
  for (let i = DAYS_SHOWN - 1; i >= 0; i--) {
    days.push({
      date: isoDaysAgo(i, now),
      status: anomalies[i] ?? "operational",
    })
  }
  return days
}

export function getStatusServices(now: Date): StatusService[] {
  return [
    {
      name: "Gateway API",
      description: "Endpoint principal de inferência e roteamento",
      status: "operational",
      uptime: "99,98%",
      days: buildDays(now, { 41: "degraded", 12: "degraded" }),
    },
    {
      name: "Roteamento de modelos",
      description: "Seleção e failover entre provedores",
      status: "operational",
      uptime: "99,99%",
      days: buildDays(now, { 41: "degraded" }),
    },
    {
      name: "Streaming",
      description: "Respostas por SSE e conexões persistentes",
      status: "operational",
      uptime: "99,95%",
      days: buildDays(now, { 63: "outage", 12: "degraded" }),
    },
    {
      name: "Dashboard",
      description: "Console web, métricas e billing",
      status: "operational",
      uptime: "99,97%",
      days: buildDays(now, { 27: "maintenance" }),
    },
    {
      name: "Autenticação",
      description: "Emissão e validação de chaves de API",
      status: "operational",
      uptime: "100%",
      days: buildDays(now),
    },
    {
      name: "Docs",
      description: "Documentação pública e referência da API",
      status: "operational",
      uptime: "100%",
      days: buildDays(now),
    },
  ]
}

export function getIncidents(now: Date): Incident[] {
  return [
    {
      date: isoDaysAgo(12, now),
      title: "Latência elevada no Gateway API",
      severity: "degraded",
      resolved: true,
      duration: "1h 24min",
      affected: ["Gateway API", "Streaming"],
      updates: [
        {
          time: "14:52",
          label: "Resolvido",
          body: "As latências retornaram aos níveis normais. Seguimos monitorando por 24h como precaução.",
        },
        {
          time: "14:10",
          label: "Monitorando",
          body: "Aplicamos a correção no balanceador de um provedor upstream. As métricas de p95 estão normalizando.",
        },
        {
          time: "13:28",
          label: "Investigando",
          body: "Identificamos aumento de latência em requisições roteadas para um provedor específico. Requisições não foram perdidas.",
        },
      ],
    },
    {
      date: isoDaysAgo(27, now),
      title: "Manutenção programada do Dashboard",
      severity: "maintenance",
      resolved: true,
      duration: "35min",
      affected: ["Dashboard"],
      updates: [
        {
          time: "03:35",
          label: "Concluído",
          body: "Migração do banco de métricas concluída sem impacto na API. O Dashboard voltou a operar normalmente.",
        },
        {
          time: "03:00",
          label: "Em andamento",
          body: "Início da janela de manutenção anunciada. A API e o roteamento seguem operando normalmente.",
        },
      ],
    },
    {
      date: isoDaysAgo(63, now),
      title: "Interrupção parcial no Streaming",
      severity: "outage",
      resolved: true,
      duration: "48min",
      affected: ["Streaming"],
      updates: [
        {
          time: "10:03",
          label: "Resolvido",
          body: "Conexões SSE restabelecidas para todos os clientes. Publicaremos o post-mortem em até 72h.",
        },
        {
          time: "09:41",
          label: "Identificado",
          body: "Uma atualização de infraestrutura derrubou parte dos nós de streaming. Rollback em andamento; chamadas síncronas não foram afetadas.",
        },
        {
          time: "09:15",
          label: "Investigando",
          body: "Detectamos falhas em novas conexões de streaming em parte da frota. Investigando a causa raiz.",
        },
      ],
    },
  ]
}
