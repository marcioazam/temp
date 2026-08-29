// Camada de dados mock do Painel Nylla — todos os valores são de demonstração.

export type ProviderStatus = 'operational' | 'degraded' | 'paused'
export type ModelStatus = 'active' | 'inactive'
export type KeyEnvironment = 'prod' | 'staging'
export type MemberRole = 'Owner' | 'Admin' | 'Developer' | 'Viewer'
export type MemberStatus = 'active' | 'invited'

export interface Provider {
  id: string
  name: string
  slug: string
  status: ProviderStatus
  latencyMs: number
  errorRate: number
  monthCost: number
  modelsCount: number
  trafficPct: number
}

export interface Model {
  id: string
  name: string
  providerId: string
  type: 'Chat' | 'Embedding' | 'Áudio' | 'Visão'
  status: ModelStatus
  inputPrice: number // US$ por 1M tokens
  outputPrice: number
  contextWindow: string
  trafficPct: number
  latencyMs: number
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  environment: KeyEnvironment
  scope: string
  lastUsed: string
  createdBy: string
  createdAt: string
  revoked: boolean
}

export interface Member {
  id: string
  name: string
  email: string
  role: MemberRole
  status: MemberStatus
  spend: number
  lastAccess: string
}

export interface LogEntry {
  id: string
  time: string
  model: string
  provider: string
  status: number
  latencyMs: number
  tokensIn: number
  tokensOut: number
  cost: number
  endpoint: string
  apiKey: string
}

export interface BudgetAlert {
  id: string
  name: string
  threshold: number
  action: string
  active: boolean
}

export interface ActivityItem {
  id: string
  text: string
  detail: string
  time: string
  kind: 'key' | 'model' | 'user' | 'budget' | 'provider'
}

export interface CostMonth {
  month: string
  cost: number
  requests: number
}

export interface PainelSettings {
  workspaceName: string
  defaultEnvironment: KeyEnvironment
  fallbackEnabled: boolean
  cacheEnabled: boolean
  webhookUrl: string
  webhookEnabled: boolean
  notifyBudget: boolean
  notifyIncidents: boolean
  notifyWeeklyReport: boolean
  retentionDays: number
  piiRedaction: boolean
  ssoRequired: boolean
  monthlyLimit: number
}

export interface PainelState {
  providers: Provider[]
  models: Model[]
  keys: ApiKey[]
  members: Member[]
  logs: LogEntry[]
  budgets: BudgetAlert[]
  activity: ActivityItem[]
  settings: PainelSettings
  checklist: { id: string; label: string; done: boolean }[]
}

export const providersSeed: Provider[] = [
  { id: 'openai', name: 'OpenAI', slug: 'openai', status: 'operational', latencyMs: 412, errorRate: 0.12, monthCost: 2140.32, modelsCount: 3, trafficPct: 38 },
  { id: 'anthropic', name: 'Anthropic', slug: 'anthropic', status: 'operational', latencyMs: 508, errorRate: 0.08, monthCost: 1730.11, modelsCount: 2, trafficPct: 27 },
  { id: 'google', name: 'Google Gemini', slug: 'google', status: 'degraded', latencyMs: 934, errorRate: 1.84, monthCost: 812.4, modelsCount: 2, trafficPct: 16 },
  { id: 'mistral', name: 'Mistral', slug: 'mistral', status: 'operational', latencyMs: 356, errorRate: 0.21, monthCost: 402.75, modelsCount: 1, trafficPct: 8 },
  { id: 'groq', name: 'Groq', slug: 'groq', status: 'operational', latencyMs: 118, errorRate: 0.05, monthCost: 244.9, modelsCount: 1, trafficPct: 6 },
  { id: 'cohere', name: 'Cohere', slug: 'cohere', status: 'operational', latencyMs: 447, errorRate: 0.3, monthCost: 168.22, modelsCount: 1, trafficPct: 3 },
  { id: 'azure', name: 'Azure OpenAI', slug: 'azure', status: 'paused', latencyMs: 0, errorRate: 0, monthCost: 121.87, modelsCount: 0, trafficPct: 1 },
  { id: 'bedrock', name: 'AWS Bedrock', slug: 'bedrock', status: 'operational', latencyMs: 611, errorRate: 0.44, monthCost: 50.0, modelsCount: 0, trafficPct: 1 },
]

export const modelsSeed: Model[] = [
  { id: 'gpt-4.1', name: 'gpt-4.1', providerId: 'openai', type: 'Chat', status: 'active', inputPrice: 2.0, outputPrice: 8.0, contextWindow: '1M', trafficPct: 24, latencyMs: 620 },
  { id: 'gpt-4.1-mini', name: 'gpt-4.1-mini', providerId: 'openai', type: 'Chat', status: 'active', inputPrice: 0.4, outputPrice: 1.6, contextWindow: '1M', trafficPct: 11, latencyMs: 310 },
  { id: 'text-embedding-3', name: 'text-embedding-3-large', providerId: 'openai', type: 'Embedding', status: 'active', inputPrice: 0.13, outputPrice: 0, contextWindow: '8K', trafficPct: 3, latencyMs: 90 },
  { id: 'claude-sonnet-4-5', name: 'claude-sonnet-4-5', providerId: 'anthropic', type: 'Chat', status: 'active', inputPrice: 3.0, outputPrice: 15.0, contextWindow: '200K', trafficPct: 19, latencyMs: 740 },
  { id: 'claude-haiku-4-5', name: 'claude-haiku-4-5', providerId: 'anthropic', type: 'Chat', status: 'active', inputPrice: 1.0, outputPrice: 5.0, contextWindow: '200K', trafficPct: 8, latencyMs: 380 },
  { id: 'gemini-2.5-pro', name: 'gemini-2.5-pro', providerId: 'google', type: 'Chat', status: 'active', inputPrice: 1.25, outputPrice: 10.0, contextWindow: '1M', trafficPct: 10, latencyMs: 890 },
  { id: 'gemini-2.5-flash', name: 'gemini-2.5-flash', providerId: 'google', type: 'Chat', status: 'active', inputPrice: 0.3, outputPrice: 2.5, contextWindow: '1M', trafficPct: 6, latencyMs: 410 },
  { id: 'mistral-large', name: 'mistral-large-latest', providerId: 'mistral', type: 'Chat', status: 'active', inputPrice: 2.0, outputPrice: 6.0, contextWindow: '128K', trafficPct: 8, latencyMs: 520 },
  { id: 'llama-3.3-70b', name: 'llama-3.3-70b-versatile', providerId: 'groq', type: 'Chat', status: 'active', inputPrice: 0.59, outputPrice: 0.79, contextWindow: '128K', trafficPct: 6, latencyMs: 140 },
  { id: 'command-r-plus', name: 'command-r-plus', providerId: 'cohere', type: 'Chat', status: 'inactive', inputPrice: 2.5, outputPrice: 10.0, contextWindow: '128K', trafficPct: 0, latencyMs: 480 },
]

export const keysSeed: ApiKey[] = [
  { id: 'k1', name: 'Produção — API principal', prefix: 'nyl_live_4f2a', environment: 'prod', scope: 'Completo', lastUsed: 'há 2 min', createdBy: 'Ana Ribeiro', createdAt: '12/01/2026', revoked: false },
  { id: 'k2', name: 'CI/CD — Deploy pipeline', prefix: 'nyl_live_9c81', environment: 'prod', scope: 'Somente inferência', lastUsed: 'há 34 min', createdBy: 'Bruno Costa', createdAt: '03/02/2026', revoked: false },
  { id: 'k3', name: 'Staging — testes de agente', prefix: 'nyl_test_b7e3', environment: 'staging', scope: 'Completo', lastUsed: 'há 3 h', createdBy: 'Camila Souza', createdAt: '18/03/2026', revoked: false },
  { id: 'k4', name: 'Playground local', prefix: 'nyl_test_2d09', environment: 'staging', scope: 'Somente leitura', lastUsed: 'há 2 dias', createdBy: 'Diego Martins', createdAt: '02/05/2026', revoked: false },
  { id: 'k5', name: 'Legado — app mobile v1', prefix: 'nyl_live_77aa', environment: 'prod', scope: 'Completo', lastUsed: 'há 3 meses', createdBy: 'Ana Ribeiro', createdAt: '20/08/2025', revoked: true },
]

export const membersSeed: Member[] = [
  { id: 'u1', name: 'Ana Ribeiro', email: 'ana@nyllalabs.com', role: 'Owner', status: 'active', spend: 1842.5, lastAccess: 'agora' },
  { id: 'u2', name: 'Bruno Costa', email: 'bruno@nyllalabs.com', role: 'Admin', status: 'active', spend: 1204.18, lastAccess: 'há 12 min' },
  { id: 'u3', name: 'Camila Souza', email: 'camila@nyllalabs.com', role: 'Developer', status: 'active', spend: 986.02, lastAccess: 'há 1 h' },
  { id: 'u4', name: 'Diego Martins', email: 'diego@nyllalabs.com', role: 'Developer', status: 'active', spend: 754.9, lastAccess: 'há 4 h' },
  { id: 'u5', name: 'Elena Prado', email: 'elena@nyllalabs.com', role: 'Developer', status: 'active', spend: 512.33, lastAccess: 'ontem' },
  { id: 'u6', name: 'Felipe Nunes', email: 'felipe@nyllalabs.com', role: 'Viewer', status: 'invited', spend: 0, lastAccess: '—' },
  { id: 'u7', name: 'Gabriela Lima', email: 'gabriela@nyllalabs.com', role: 'Viewer', status: 'active', spend: 370.64, lastAccess: 'há 2 dias' },
]

const logModels = [
  { model: 'gpt-4.1', provider: 'OpenAI' },
  { model: 'claude-sonnet-4-5', provider: 'Anthropic' },
  { model: 'gemini-2.5-flash', provider: 'Google Gemini' },
  { model: 'gpt-4.1-mini', provider: 'OpenAI' },
  { model: 'llama-3.3-70b-versatile', provider: 'Groq' },
  { model: 'claude-haiku-4-5', provider: 'Anthropic' },
  { model: 'mistral-large-latest', provider: 'Mistral' },
]

// Gerador determinístico (LCG) para dados estáveis entre servidor e cliente.
function lcg(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export const logsSeed: LogEntry[] = (() => {
  const rand = lcg(42)
  const entries: LogEntry[] = []
  let minutes = 0
  for (let i = 0; i < 48; i++) {
    minutes += Math.floor(rand() * 9) + 1
    const pick = logModels[Math.floor(rand() * logModels.length)]
    const r = rand()
    const status = r > 0.94 ? 429 : r > 0.9 ? 500 : r > 0.86 ? 400 : 200
    const tokensIn = Math.floor(rand() * 5800) + 200
    const tokensOut = status === 200 ? Math.floor(rand() * 2400) + 60 : 0
    const latencyMs = status === 200 ? Math.floor(rand() * 1800) + 120 : Math.floor(rand() * 400) + 40
    const cost = status === 200 ? Number(((tokensIn * 2 + tokensOut * 8) / 1_000_000).toFixed(4)) : 0
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    entries.push({
      id: `req_${(9000 - i).toString().padStart(4, '0')}`,
      time: h > 0 ? `há ${h} h ${m} min` : `há ${m} min`,
      model: pick.model,
      provider: pick.provider,
      status,
      latencyMs,
      tokensIn,
      tokensOut,
      cost,
      endpoint: rand() > 0.2 ? '/v1/chat/completions' : '/v1/embeddings',
      apiKey: rand() > 0.3 ? 'nyl_live_4f2a' : 'nyl_test_b7e3',
    })
  }
  return entries
})()

export const budgetsSeed: BudgetAlert[] = [
  { id: 'b1', name: 'Alerta 50% do orçamento', threshold: 50, action: 'Notificar por e-mail', active: true },
  { id: 'b2', name: 'Alerta 80% do orçamento', threshold: 80, action: 'Notificar e-mail + Slack', active: true },
  { id: 'b3', name: 'Limite rígido 100%', threshold: 100, action: 'Bloquear novas requisições', active: true },
  { id: 'b4', name: 'Anomalia de custo diário', threshold: 150, action: 'Notificar administradores', active: false },
]

export const activitySeed: ActivityItem[] = [
  { id: 'a1', text: 'Chave criada', detail: 'CI/CD — Deploy pipeline por Bruno Costa', time: 'há 34 min', kind: 'key' },
  { id: 'a2', text: 'Modelo ativado', detail: 'gemini-2.5-flash por Camila Souza', time: 'há 2 h', kind: 'model' },
  { id: 'a3', text: 'Usuário convidado', detail: 'felipe@nyllalabs.com como Viewer', time: 'há 5 h', kind: 'user' },
  { id: 'a4', text: 'Alerta de orçamento', detail: '70% do limite mensal atingido', time: 'ontem', kind: 'budget' },
  { id: 'a5', text: 'Provedor degradado', detail: 'Google Gemini — latência elevada', time: 'ontem', kind: 'provider' },
  { id: 'a6', text: 'Chave revogada', detail: 'Legado — app mobile v1 por Ana Ribeiro', time: 'há 3 dias', kind: 'key' },
]

export const costHistorySeed: CostMonth[] = [
  { month: 'Mar 2026', cost: 3120.44, requests: 812_400 },
  { month: 'Abr 2026', cost: 3684.02, requests: 940_115 },
  { month: 'Mai 2026', cost: 4210.87, requests: 1_102_338 },
  { month: 'Jun 2026', cost: 4788.19, requests: 1_264_902 },
  { month: 'Jul 2026', cost: 5341.6, requests: 1_398_557 },
  { month: 'Ago 2026', cost: 5670.57, requests: 1_487_210 },
]

export const settingsSeed: PainelSettings = {
  workspaceName: 'Nylla Labs',
  defaultEnvironment: 'prod',
  fallbackEnabled: true,
  cacheEnabled: true,
  webhookUrl: 'https://api.nyllalabs.com/hooks/nylla',
  webhookEnabled: true,
  notifyBudget: true,
  notifyIncidents: true,
  notifyWeeklyReport: false,
  retentionDays: 30,
  piiRedaction: true,
  ssoRequired: false,
  monthlyLimit: 8000,
}

export const checklistSeed = [
  { id: 'c1', label: 'Conectar o primeiro provedor', done: true },
  { id: 'c2', label: 'Criar uma chave de API', done: true },
  { id: 'c3', label: 'Executar a primeira requisição', done: true },
  { id: 'c4', label: 'Convidar a equipe', done: true },
  { id: 'c5', label: 'Configurar orçamento e alertas', done: false },
]

export const seedState: PainelState = {
  providers: providersSeed,
  models: modelsSeed,
  keys: keysSeed,
  members: membersSeed,
  logs: logsSeed,
  budgets: budgetsSeed,
  activity: activitySeed,
  settings: settingsSeed,
  checklist: checklistSeed,
}

// ── Séries temporais de uso (determinísticas) ────────────────────────────────

export interface UsagePoint {
  label: string
  requests: number
  tokens: number
  cost: number
}

function buildSeries(labels: string[], base: number, amp: number, seed: number): UsagePoint[] {
  const rand = lcg(seed)
  return labels.map((label, i) => {
    const wave = Math.sin(i / labels.length * Math.PI * 1.6) * amp
    const requests = Math.max(80, Math.round(base + wave + rand() * amp * 0.6))
    const tokens = Math.round(requests * (3600 + rand() * 900))
    return { label, requests, tokens, cost: Number((requests * 0.0038).toFixed(2)) }
  })
}

export const usageSeries: Record<'24h' | '7d' | '30d', UsagePoint[]> = {
  '24h': buildSeries(
    Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`),
    1850, 1400, 7,
  ),
  '7d': buildSeries(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], 46200, 21000, 11),
  '30d': buildSeries(
    Array.from({ length: 30 }, (_, i) => `${(i + 1).toString().padStart(2, '0')}`),
    44100, 24000, 13,
  ),
}

// Heatmap anual: 52 semanas x 7 dias, intensidade 0–4.
export const heatmapSeed: number[][] = (() => {
  const rand = lcg(99)
  return Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const weekday = d < 5
      const ramp = w / 52
      const r = rand()
      if (!weekday && r < 0.55) return 0
      const v = r * 3.2 + ramp * 1.6 + (weekday ? 0.5 : 0)
      return Math.min(4, Math.floor(v))
    }),
  )
})()

export const costByTeamSeed = [
  { name: 'Plataforma', value: 2312.4 },
  { name: 'Agentes', value: 1688.9 },
  { name: 'Produto', value: 984.15 },
  { name: 'Dados', value: 685.12 },
]
