const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const currencyPrecise = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const compact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })
const plain = new Intl.NumberFormat('pt-BR')

export function fmtCurrency(value: number) {
  return currency.format(value)
}

export function fmtCurrencyPrecise(value: number) {
  return currencyPrecise.format(value)
}

export function fmtCompact(value: number) {
  return compact.format(value)
}

export function fmtNumber(value: number) {
  return plain.format(value)
}

export function fmtPercent(value: number, digits = 1) {
  return `${value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`
}

export function fmtLatency(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} s`
  return `${plain.format(ms)} ms`
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

export function randomKeySuffix() {
  const chars = 'abcdef0123456789'
  let out = ''
  for (let i = 0; i < 32; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}
