/**
 * Camada de consentimento (LGPD — Lei 13.709/2018).
 *
 * Princípios aplicados:
 * - Opt-in real: nada além do estritamente necessário roda antes da escolha (art. 7º/8º).
 * - Granularidade por finalidade (art. 9º, II): cada categoria é decidida em separado.
 * - Revogação simples (art. 8º, §5º): o registro pode ser reaberto/limpo a qualquer momento.
 * - Prova de consentimento: versão do aviso, data/hora e método ficam gravados.
 * - Validade limitada: após 180 dias o consentimento é renovado.
 * - Global Privacy Control: sinal de opt-out do navegador é respeitado sem exibir aviso.
 */

export const CONSENT_VERSION = '2026.2'
export const CONSENT_STORAGE_KEY = 'nylla-consent'
export const CONSENT_COOKIE_NAME = 'nylla_consent'
export const CONSENT_MAX_AGE_DAYS = 180
/** Evento disparado em `window` a cada mudança de consentimento. */
export const CONSENT_EVENT = 'nylla:consent'
/** Evento que reabre o painel de preferências (usado pelo rodapé). */
export const CONSENT_OPEN_EVENT = 'nylla:consent-open'

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

export type ConsentChoices = Record<ConsentCategory, boolean>

export type ConsentMethod = 'accept-all' | 'reject-all' | 'custom' | 'gpc'

export type ConsentRecord = {
  version: string
  /** ISO 8601 — data/hora da manifestação de vontade. */
  timestamp: string
  method: ConsentMethod
  choices: ConsentChoices
}

/** Estado inicial: apenas cookies necessários. Nenhuma caixa pré-marcada. */
export const DEFAULT_CHOICES: ConsentChoices = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export const CONSENT_CATEGORIES: Array<{
  id: ConsentCategory
  label: string
  description: string
  required?: boolean
}> = [
  {
    id: 'necessary',
    label: 'Necessários',
    description: 'Segurança, sessão e preferências básicas. Sem eles o site não funciona.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Análise',
    description: 'Métricas agregadas de uso para melhorar a documentação e o produto.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Medição de campanhas e conteúdo personalizado fora do site.',
  },
]

function isBrowser() {
  return typeof window !== 'undefined'
}

/** Sinal de opt-out enviado pelo navegador (Global Privacy Control). */
export function hasGlobalPrivacyControl() {
  if (!isBrowser()) return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

function parseRecord(raw: string | null | undefined): ConsentRecord | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>
    if (!parsed || typeof parsed !== 'object' || !parsed.choices) return null
    return {
      version: String(parsed.version ?? ''),
      timestamp: String(parsed.timestamp ?? ''),
      method: (parsed.method ?? 'custom') as ConsentMethod,
      choices: {
        necessary: true,
        analytics: parsed.choices.analytics === true,
        marketing: parsed.choices.marketing === true,
      },
    }
  } catch {
    return null
  }
}

function readCookie(name: string) {
  if (!isBrowser()) return null
  const match = document.cookie.split('; ').find((entry) => entry.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

/** O registro válido mais recente, ou `null` quando ainda não há escolha. */
export function readConsent(): ConsentRecord | null {
  if (!isBrowser()) return null
  const record =
    parseRecord(readCookie(CONSENT_COOKIE_NAME)) ??
    parseRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY))

  if (!record) return null
  if (record.version !== CONSENT_VERSION) return null
  if (isExpired(record)) return null
  return record
}

export function isExpired(record: ConsentRecord) {
  const time = Date.parse(record.timestamp)
  if (Number.isNaN(time)) return true
  return Date.now() - time > CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000
}

export function createRecord(method: ConsentMethod, choices: ConsentChoices): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    method,
    choices: { ...choices, necessary: true },
  }
}

export function writeConsent(record: ConsentRecord) {
  if (!isBrowser()) return
  const value = JSON.stringify(record)

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    // Modo privado com storage bloqueado: o cookie abaixo continua valendo.
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  }; SameSite=Lax${secure}`

  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }))
}

/** Revogação total (art. 8º, §5º): remove o registro e volta ao estado inicial. */
export function clearConsent() {
  if (!isBrowser()) return
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // ignora storage indisponível
  }
  document.cookie = `${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
  window.dispatchEvent(
    new CustomEvent<ConsentRecord | null>(CONSENT_EVENT, { detail: null }),
  )
}
