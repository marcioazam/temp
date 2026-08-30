'use client'

import { useMemo, useState } from 'react'
import { Check, Lock, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { Model, ModelCatalogStatus, ModelHealth } from '@/lib/painel/data'
import { fmtCompact, fmtCurrency, fmtLatency, fmtNumber, fmtPercent, fmtTokens } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Dialog } from '@/components/painel/ui/dialog'
import { NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

const healthMeta: Record<ModelHealth, { label: string; tone: 'success' | 'warning' | 'danger' }> = {
  operational: { label: 'Disponível', tone: 'success' },
  degraded: { label: 'Degradado', tone: 'warning' },
  down: { label: 'Indisponível', tone: 'danger' },
}

const catalogMeta: Record<ModelCatalogStatus, { label: string; hint: string }> = {
  enabled: { label: 'No catálogo', hint: 'Liberado para uso em todas as chaves do workspace.' },
  restricted: { label: 'Restrito', hint: 'Liberação sob solicitação à equipe Nylla.' },
  deprecated: { label: 'Depreciado', hint: 'Descontinuado pelo gateway — migre para um modelo equivalente.' },
}

const capabilityLabels: { key: keyof Model['capabilities']; label: string }[] = [
  { key: 'streaming', label: 'Stream' },
  { key: 'functionCalling', label: 'Tools' },
  { key: 'vision', label: 'Visão' },
  { key: 'jsonMode', label: 'JSON' },
]

export default function ModelsPage() {
  const { state } = usePainel()
  const [query, setQuery] = useState('')
  const [providerFilter, setProviderFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [healthFilter, setHealthFilter] = useState('all')
  const [detail, setDetail] = useState<Model | null>(null)

  const providerName = (id: string) => state.providers.find((p) => p.id === id)?.name ?? id

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.models.filter(
      (m) =>
        (providerFilter === 'all' || m.providerId === providerFilter) &&
        (typeFilter === 'all' || m.type === typeFilter) &&
        (healthFilter === 'all' || m.health === healthFilter) &&
        (q === '' ||
          m.name.toLowerCase().includes(q) ||
          m.displayName.toLowerCase().includes(q) ||
          m.gatewayId.toLowerCase().includes(q) ||
          providerName(m.providerId).toLowerCase().includes(q)),
    )
  }, [state.models, state.providers, query, providerFilter, typeFilter, healthFilter])

  const hasActiveFilters = query !== '' || providerFilter !== 'all' || typeFilter !== 'all' || healthFilter !== 'all'
  const available = state.models.filter((m) => m.catalog === 'enabled' && m.health === 'operational').length
  const degraded = state.models.filter((m) => m.health !== 'operational').length
  const maxContext = Math.max(...state.models.map((m) => m.contextTokens))
  const types = [...new Set(state.models.map((m) => m.type))]

  const summary = [
    { label: 'Modelos no gateway', value: fmtNumber(state.models.length) },
    { label: 'Disponíveis agora', value: fmtNumber(available) },
    { label: 'Com incidente', value: fmtNumber(degraded) },
    { label: 'Contexto máximo', value: `${fmtTokens(maxContext)} tokens` },
  ]

  return (
    <>
      <PageHeader
        title="Modelos"
        description="Consulte limites, preços, capacidades e confiabilidade dos modelos provisionados e mantidos pelo gateway Nylla. Este catálogo é somente leitura."
      />

      <div className="grid gap-px border border-border/35 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 bg-muted/20 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{item.label}</span>
            <span className="font-mono text-[18px] tabular-nums tracking-tight text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por modelo, provedor ou ID no gateway"
          aria-label="Buscar modelos"
          className="sm:max-w-72"
        />
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-44">
            <NativeSelect
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              aria-label="Filtrar por provedor"
            >
              <option value="all">Todos os provedores</option>
              {state.providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="w-36">
            <NativeSelect
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filtrar por tipo"
            >
              <option value="all">Todos os tipos</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="w-36">
            <NativeSelect
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              aria-label="Filtrar por saúde"
            >
              <option value="all">Toda a saúde</option>
              <option value="operational">Disponível</option>
              <option value="degraded">Degradado</option>
              <option value="down">Indisponível</option>
            </NativeSelect>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setQuery('')
                setProviderFilter('all')
                setTypeFilter('all')
                setHealthFilter('all')
              }}
            >
              Limpar filtros
            </Button>
          )}
        </div>
        <span className="font-mono text-[11px] tabular-nums text-subtle-foreground sm:ml-auto">
          {filtered.length} de {state.models.length} modelos
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="border border-border/35 bg-muted/20 px-4 py-12 text-center text-[12px] text-muted-foreground">
          Nenhum modelo corresponde aos filtros selecionados.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((model) => {
            const health = healthMeta[model.health]
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setDetail(model)}
                aria-label={`Ver detalhes de ${model.displayName}: ${providerName(model.providerId)}, ${health.label}`}
                className={cn(
                  'group relative flex flex-col text-left transition-all duration-200',
                  'border border-border/35 bg-card',
                  'hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_32px_-12px_rgba(245,165,36,0.15)]',
                  'focus-visible:outline-1 focus-visible:outline-ring',
                  model.catalog === 'deprecated' && 'opacity-60 hover:opacity-90',
                )}
              >
                {/* Filete de saúde no topo */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 top-0 h-px transition-colors',
                    model.health === 'operational' && 'bg-term-success/50 group-hover:bg-primary/60',
                    model.health === 'degraded' && 'bg-status-warning/70',
                    model.health === 'down' && 'bg-destructive/60',
                  )}
                />

                <header className="flex items-start justify-between gap-3 p-4 pb-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate font-mono text-[13px] tracking-tight text-foreground transition-colors group-hover:text-primary" data-no-translate>
                      {model.name}
                    </span>
                    <span className="flex items-center gap-1.5 truncate text-[11px] text-subtle-foreground">
                      {providerName(model.providerId)}
                      <span className="text-border" aria-hidden="true">/</span>
                      {model.type}
                    </span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em]',
                        model.health === 'operational' && 'text-term-success',
                        model.health === 'degraded' && 'text-status-warning',
                        model.health === 'down' && 'text-destructive',
                      )}
                    >
                      <span className={cn('size-1 bg-current', model.health !== 'down' && 'animate-pulse')} aria-hidden="true" />
                      {health.label}
                    </span>
                    {model.catalog !== 'enabled' && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-subtle-foreground">
                        {catalogMeta[model.catalog].label}
                      </span>
                    )}
                  </div>
                </header>

                {/* Métrica herói: contexto */}
                <div className="flex items-end justify-between gap-3 p-4 pb-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[28px] leading-none tabular-nums tracking-tighter text-foreground">
                      {fmtTokens(model.contextTokens)}
                    </span>
                    <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-subtle-foreground">
                      Tokens de contexto
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 pb-0.5">
                    <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
                      {model.maxOutputTokens > 0 ? fmtTokens(model.maxOutputTokens) : 'n/d'}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Saída máx.</span>
                  </div>
                </div>

                {/* Tráfego com barra no âmbar da marca */}
                <div className="flex flex-col gap-1.5 px-4 pb-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Tráfego 30d</span>
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      <span className="text-foreground">{fmtPercent(model.trafficPct, 0)}</span> · {fmtCompact(model.requests30d)} req
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-border/50" aria-hidden="true">
                    <div
                      className={cn('h-full transition-all', model.trafficPct > 0 ? 'bg-primary' : 'bg-transparent')}
                      style={{ width: `${Math.min(100, model.trafficPct * 4)}%` }}
                    />
                  </div>
                </div>

                {/* Preço + capacidades em rodapé denso */}
                <div className="mt-auto grid grid-cols-2 gap-px border-t border-border/30 bg-border/20">
                  <div className="flex flex-col gap-0.5 bg-card px-4 py-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Entrada /1M</span>
                    <span className="font-mono text-[12px] tabular-nums text-foreground">{fmtCurrency(model.inputPrice)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 bg-card px-4 py-2.5 text-right">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Saída /1M</span>
                    <span className="font-mono text-[12px] tabular-nums text-foreground">
                      {model.outputPrice > 0 ? fmtCurrency(model.outputPrice) : 'n/d'}
                    </span>
                  </div>
                </div>

                <footer className="flex items-center justify-between border-t border-border/30 px-4 py-2.5">
                  <div className="flex gap-1">
                    {capabilityLabels.map((c) => {
                      const supported = model.capabilities[c.key]
                      return (
                        <span
                          key={c.key}
                          className={cn(
                            'px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors',
                            supported
                              ? 'bg-primary/10 text-primary'
                              : 'text-border line-through decoration-border',
                          )}
                        >
                          {c.label}
                        </span>
                      )
                    })}
                  </div>
                  <span className="font-mono text-[10px] tabular-nums text-subtle-foreground">
                    {model.latencyMs > 0 ? fmtLatency(model.latencyMs) : 'sem tráfego'}
                  </span>
                </footer>
              </button>
            )
          })}
        </div>
      )}

      <Dialog
        open={detail !== null}
        onOpenChange={(o) => {
          if (!o) setDetail(null)
        }}
        title={detail?.displayName ?? ''}
        description={detail ? `${providerName(detail.providerId)} · ${detail.type} · ${healthMeta[detail.health].label}` : undefined}
        side="right"
      >
        {detail && (
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">ID no gateway</p>
              <code
                className="border border-border bg-background px-3 py-2 font-mono text-[12px] text-muted-foreground"
                data-no-translate
              >
                {detail.gatewayId}
              </code>
            </div>

            <DetailSection
              title="Identificação"
              rows={[
                ['Nome técnico', detail.name],
                ['Versão', detail.version],
                ['Provedor', providerName(detail.providerId)],
                ['Tipo', detail.type],
                ['Knowledge cutoff', detail.knowledgeCutoff],
                ['Catálogo', catalogMeta[detail.catalog].label],
              ]}
            />

            <DetailSection
              title="Limites"
              rows={[
                ['Contexto total', `${fmtNumber(detail.contextTokens)} tokens`],
                ['Saída máxima', detail.maxOutputTokens > 0 ? `${fmtNumber(detail.maxOutputTokens)} tokens` : '—'],
              ]}
            />

            <DetailSection
              title="Preço"
              rows={[
                ['Entrada / 1M tokens', fmtCurrency(detail.inputPrice)],
                ['Saída / 1M tokens', detail.outputPrice > 0 ? fmtCurrency(detail.outputPrice) : '—'],
              ]}
            />

            <DetailSection
              title="Uso nos últimos 30 dias"
              rows={[
                ['Tráfego do gateway', fmtPercent(detail.trafficPct, 0)],
                ['Requisições', fmtNumber(detail.requests30d)],
                ['Tokens processados', fmtNumber(detail.tokens30d)],
              ]}
            />

            <DetailSection
              title="Confiabilidade"
              rows={[
                ['Latência média', detail.latencyMs > 0 ? fmtLatency(detail.latencyMs) : '—'],
                ['Latência p95', detail.latencyP95Ms > 0 ? fmtLatency(detail.latencyP95Ms) : '—'],
                ['Taxa de erro', fmtPercent(detail.errorRate, 2)],
                ['Uptime', detail.uptimePct > 0 ? fmtPercent(detail.uptimePct, 2) : '—'],
              ]}
            />

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Capacidades</p>
              <ul className="flex flex-col divide-y divide-border/30 border border-border/35">
                {capabilityLabels.map((c) => {
                  const supported = detail.capabilities[c.key]
                  return (
                    <li key={c.key} className="flex items-center justify-between px-3 py-2">
                      <span className="text-[12px] text-foreground">{c.label}</span>
                      {supported ? (
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-term-success">
                          <Check className="size-3" /> Suportado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-subtle-foreground">
                          <Minus className="size-3" /> Indisponível
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="flex items-start gap-2 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
              <Lock className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
              {catalogMeta[detail.catalog].hint} A configuração dos modelos é gerenciada pelo gateway Nylla e não pode ser
              alterada no painel.
            </p>
          </div>
        )}
      </Dialog>
    </>
  )
}

function DetailSection({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{title}</p>
      <dl className="flex flex-col divide-y divide-border/30 border border-border/35">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 px-3 py-2">
            <dt className="text-[12px] text-muted-foreground">{label}</dt>
            <dd className="text-right font-mono text-[12px] tabular-nums text-foreground" data-no-translate>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
