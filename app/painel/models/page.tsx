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
  deprecated: { label: 'Depreciado', hint: 'Descontinuado pelo gateway Não disponível migre para um modelo equivalente.' },
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
        description="Catálogo somente leitura Não disponível os modelos são provisionados e mantidos pelo gateway Nylla. Consulte limites, preço, capacidades e confiabilidade de cada um."
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
          {filtered.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => setDetail(model)}
              aria-label={`Ver detalhes de ${model.displayName} Não disponível ${providerName(model.providerId)}, ${healthMeta[model.health].label}`}
              className="flex flex-col gap-3 border border-border/35 bg-muted/20 p-4 text-left transition-colors hover:border-border hover:bg-muted/40 focus-visible:outline-1 focus-visible:outline-ring"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-mono text-[13px] text-foreground" data-no-translate>
                    {model.name}
                  </span>
                  <span className="truncate text-[11px] text-subtle-foreground">
                    {providerName(model.providerId)} · {model.type}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <StatusBadge tone={healthMeta[model.health].tone}>{healthMeta[model.health].label}</StatusBadge>
                  {model.catalog !== 'enabled' && (
                    <StatusBadge tone="muted" dot={false}>
                      {catalogMeta[model.catalog].label}
                    </StatusBadge>
                  )}
                </div>
              </header>

              <div className="flex items-end justify-between gap-3 border-t border-border/30 pt-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Contexto</span>
                  <span className="font-mono text-[17px] tabular-nums tracking-tight text-foreground">
                    {fmtTokens(model.contextTokens)}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Saída máx.</span>
                  <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
                    {model.maxOutputTokens > 0 ? `${fmtTokens(model.maxOutputTokens)} tokens` : 'Não disponível'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Tráfego 30d</span>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {fmtPercent(model.trafficPct, 0)} · {fmtCompact(model.requests30d)} req
                  </span>
                </div>
                <div className="h-1 w-full bg-muted" aria-hidden="true">
                  <div
                    className={cn('h-full', model.trafficPct > 0 ? 'bg-foreground/60' : 'bg-transparent')}
                    style={{ width: `${Math.min(100, model.trafficPct * 4)}%` }}
                  />
                </div>
              </div>

              <dl className="flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                <div className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Entrada /1M</dt>
                  <dd className="font-mono text-[12px] tabular-nums text-foreground">{fmtCurrency(model.inputPrice)}</dd>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">Saída /1M</dt>
                  <dd className="font-mono text-[12px] tabular-nums text-foreground">
                    {model.outputPrice > 0 ? fmtCurrency(model.outputPrice) : 'Não disponível'}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-1">
                {capabilityLabels
                  .filter((c) => model.capabilities[c.key])
                  .map((c) => (
                    <span
                      key={c.key}
                      className={cn(
                        'border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]',
                        c.key === 'vision'
                          ? 'border-term-success/30 bg-term-success/5 text-term-success'
                          : 'border-border text-subtle-foreground',
                      )}
                    >
                      {c.label}
                    </span>
                  ))}
              </div>

              <footer className="flex items-center justify-between border-t border-border/30 pt-2.5 font-mono text-[10px] tabular-nums text-subtle-foreground">
                <span>{model.latencyMs > 0 ? fmtLatency(model.latencyMs) : 'Não disponível'} média</span>
                <span>{model.uptimePct > 0 ? `${fmtPercent(model.uptimePct, 2)} uptime` : 'sem tráfego'}</span>
              </footer>
            </button>
          ))}
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
                ['Saída máxima', detail.maxOutputTokens > 0 ? `${fmtNumber(detail.maxOutputTokens)} tokens` : 'Não disponível'],
              ]}
            />

            <DetailSection
              title="Preço"
              rows={[
                ['Entrada / 1M tokens', fmtCurrency(detail.inputPrice)],
                ['Saída / 1M tokens', detail.outputPrice > 0 ? fmtCurrency(detail.outputPrice) : 'Não disponível'],
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
                ['Latência média', detail.latencyMs > 0 ? fmtLatency(detail.latencyMs) : 'Não disponível'],
                ['Latência p95', detail.latencyP95Ms > 0 ? fmtLatency(detail.latencyP95Ms) : 'Não disponível'],
                ['Taxa de erro', fmtPercent(detail.errorRate, 2)],
                ['Uptime', detail.uptimePct > 0 ? fmtPercent(detail.uptimePct, 2) : 'Não disponível'],
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
