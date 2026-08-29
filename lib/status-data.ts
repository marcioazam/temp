// Dados do subsite de status.
// Histórico determinístico: incidentes ancorados em deslocamentos fixos
// de dias a partir de hoje, para que servidor e cliente rendam o mesmo HTML.

export type DayStatus = "operational" | "degraded" | "outage" | "maintenance"

export interface UptimeDay {
  date: string // ISO yyyy-mm-dd
  status: DayStatus
}

export interface UptimeMonth {
  month: string // ISO yyyy-mm
  uptime: string
  status: DayStatus
}

export interface UptimeHour {
  time: string // HH:00
  status: DayStatus
}

export interface StatusService {
  name: string
  description: string
  status: DayStatus
  uptime: string
  days: UptimeDay[]
  months: UptimeMonth[]
  hours: UptimeHour[]
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
export const MONTHS_SHOWN = 12
export const HOURS_SHOWN = 24

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

function isoMonthsAgo(monthsAgo: number, now: Date): string {
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

/** Gera a série de 12 meses com quedas pontuais em meses fixos. */
function buildMonths(
  now: Date,
  dips: Record<number, { status: DayStatus; uptime: string }> = {},
): UptimeMonth[] {
  const months: UptimeMonth[] = []
  for (let i = MONTHS_SHOWN - 1; i >= 0; i--) {
    const dip = dips[i]
    months.push({
      month: isoMonthsAgo(i, now),
      uptime: dip?.uptime ?? "100%",
      status: dip?.status ?? "operational",
    })
  }
  return months
}

/** Gera as últimas 24 horas com anomalias em deslocamentos fixos. */
function buildHours(now: Date, anomalies: Record<number, DayStatus> = {}): UptimeHour[] {
  const hours: UptimeHour[] = []
  for (let i = HOURS_SHOWN - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setHours(d.getHours() - i, 0, 0, 0)
    hours.push({
      time: `${String(d.getHours()).padStart(2, "0")}:00`,
      status: anomalies[i] ?? "operational",
    })
  }
  return hours
}

export function getStatusServices(now: Date): StatusService[] {
  return [
    {
      name: "Gateway API",
      description: "Endpoint principal de inferência e roteamento",
      status: "operational",
      uptime: "99,98%",
      days: buildDays(now, { 41: "degraded", 12: "degraded" }),
      months: buildMonths(now, {
        0: { status: "degraded", uptime: "99,91%" },
        1: { status: "degraded", uptime: "99,87%" },
        7: { status: "degraded", uptime: "99,94%" },
      }),
      hours: buildHours(now),
    },
    {
      name: "Roteamento de modelos",
      description: "Seleção e failover entre provedores",
      status: "operational",
      uptime: "99,99%",
      days: buildDays(now, { 41: "degraded" }),
      months: buildMonths(now, { 1: { status: "degraded", uptime: "99,95%" } }),
      hours: buildHours(now),
    },
    {
      name: "Streaming",
      description: "Respostas por SSE e conexões persistentes",
      status: "operational",
      uptime: "99,95%",
      days: buildDays(now, { 63: "outage", 12: "degraded" }),
      months: buildMonths(now, {
        0: { status: "degraded", uptime: "99,89%" },
        2: { status: "outage", uptime: "99,78%" },
        9: { status: "degraded", uptime: "99,93%" },
      }),
      hours: buildHours(now),
    },
    {
      name: "Dashboard",
      description: "Console web, métricas e billing",
      status: "operational",
      uptime: "99,97%",
      days: buildDays(now, { 27: "maintenance" }),
      months: buildMonths(now, { 0: { status: "maintenance", uptime: "99,92%" } }),
      hours: buildHours(now),
    },
    {
      name: "Autenticação",
      description: "Emissão e validação de chaves de API",
      status: "operational",
      uptime: "100%",
      days: buildDays(now),
      months: buildMonths(now),
      hours: buildHours(now),
    },
    {
      name: "Docs",
      description: "Documentação pública e referência da API",
      status: "operational",
      uptime: "100%",
      days: buildDays(now),
      months: buildMonths(now),
      hours: buildHours(now),
    },
  ]
}

export const HISTORY_MONTHS = 6

const DEMO_HISTORY: Array<{
  daysAgo: number
  title: string
  severity: Incident["severity"]
  duration: string
  affected: string[]
}> = [
  { daysAgo: 20, title: "Oscilação nas métricas do Dashboard", severity: "degraded", duration: "31min", affected: ["Dashboard"] },
  { daysAgo: 35, title: "Manutenção nos nós de Streaming", severity: "maintenance", duration: "44min", affected: ["Streaming"] },
  { daysAgo: 44, title: "Falhas pontuais na emissão de chaves", severity: "degraded", duration: "27min", affected: ["Autenticação"] },
  { daysAgo: 52, title: "Indisponibilidade regional do Gateway", severity: "outage", duration: "19min", affected: ["Gateway API"] },
  { daysAgo: 75, title: "Latência no roteamento automático", severity: "degraded", duration: "1h 08min", affected: ["Roteamento de modelos"] },
  { daysAgo: 84, title: "Atualização programada da autenticação", severity: "maintenance", duration: "38min", affected: ["Autenticação"] },
  { daysAgo: 96, title: "Queda parcial de conexões SSE", severity: "outage", duration: "36min", affected: ["Streaming", "Gateway API"] },
  { daysAgo: 112, title: "Processamento lento de métricas", severity: "degraded", duration: "56min", affected: ["Dashboard"] },
  { daysAgo: 121, title: "Manutenção do balanceador principal", severity: "maintenance", duration: "42min", affected: ["Gateway API", "Roteamento de modelos"] },
  { daysAgo: 140, title: "Erros em sessões recém-criadas", severity: "degraded", duration: "33min", affected: ["Autenticação"] },
  { daysAgo: 166, title: "Interrupção em respostas via streaming", severity: "outage", duration: "29min", affected: ["Streaming"] },
  { daysAgo: 176, title: "Atualização da infraestrutura de métricas", severity: "maintenance", duration: "47min", affected: ["Dashboard"] },
]

function getDemoHistory(now: Date): Incident[] {
  return DEMO_HISTORY.map((incident) => ({
    date: isoDaysAgo(incident.daysAgo, now),
    title: incident.title,
    severity: incident.severity,
    resolved: true,
    duration: incident.duration,
    affected: incident.affected,
    updates: [
      {
        time: "11:40",
        label: incident.severity === "maintenance" ? "Concluído" : "Resolvido",
        body: "O serviço voltou a operar normalmente e permaneceu estável durante o período de monitoramento.",
      },
      {
        time: "10:55",
        label: incident.severity === "maintenance" ? "Em andamento" : "Investigando",
        body: "A equipe identificou o impacto e iniciou os procedimentos de mitigação.",
      },
    ],
  }))
}

/**
 * Histórico completo para a aba /status/history: incidentes dos últimos
 * seis meses, agrupáveis por mês.
 */
export function getIncidentHistory(now: Date): Incident[] {
  return [
    ...getIncidents(now),
    ...getDemoHistory(now),
    {
      date: isoDaysAgo(104, now),
      title: "Erros intermitentes na Autenticação",
      severity: "degraded",
      resolved: true,
      duration: "52min",
      affected: ["Autenticação", "Dashboard"],
      updates: [
        {
          time: "17:20",
          label: "Resolvido",
          body: "A validação de chaves de API voltou ao normal após reinício do cluster de cache.",
        },
        {
          time: "16:28",
          label: "Investigando",
          body: "Parte das requisições de validação de chaves retornava erro 503. Chamadas já autenticadas não foram afetadas.",
        },
      ],
    },
    {
      date: isoDaysAgo(131, now),
      title: "Degradação no roteamento de modelos",
      severity: "degraded",
      resolved: true,
      duration: "2h 05min",
      affected: ["Roteamento de modelos", "Gateway API"],
      updates: [
        {
          time: "12:40",
          label: "Resolvido",
          body: "Failover automático normalizado após correção na verificação de saúde dos provedores.",
        },
        {
          time: "10:35",
          label: "Identificado",
          body: "Um provedor upstream reportava saúde incorreta, causando roteamento subótimo e latência elevada.",
        },
      ],
    },
    {
      date: isoDaysAgo(155, now),
      title: "Interrupção total do Gateway API",
      severity: "outage",
      resolved: true,
      duration: "23min",
      affected: ["Gateway API", "Roteamento de modelos", "Streaming"],
      updates: [
        {
          time: "08:11",
          label: "Resolvido",
          body: "Tráfego restabelecido em todas as regiões. Post-mortem publicado com ações corretivas.",
        },
        {
          time: "07:48",
          label: "Investigando",
          body: "Falha em cascata no balanceador principal derrubou o endpoint de inferência. Mitigação imediata em andamento.",
        },
      ],
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
          body: "As latências retornaram aos n��veis normais. Seguimos monitorando por 24h como precaução.",
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
