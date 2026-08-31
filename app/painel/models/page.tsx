'use client'

import { useMemo, useState } from 'react'
import { Check, Copy as CopyIcon, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { Model, ModelCatalogStatus, ModelHealth } from '@/lib/painel/data'
import { fmtCompact, fmtCurrency, fmtNumber, fmtPercent, fmtTokens } from '@/lib/painel/format'
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

const categoryLabels: Record<Model['categories'][number], string> = {
  Texto: 'Chat',
  Código: 'Programação',
  Raciocínio: 'Raciocínio',
  Visão: 'Visão',
  Áudio: 'Áudio e transcrição',
  Embedding: 'Embeddings',
}

const averageTokensPerSecond: Record<string, number> = {
  'gpt-4.1': 72,
  'gpt-4.1-mini': 118,
  'o4-mini': 34,
  'text-embedding-3': 824,
  'whisper-large-v3': 51,
  'gpt-4o': 79,
  'claude-sonnet-4-5': 68,
  'claude-haiku-4-5': 126,
  'claude-opus-4-1': 41,
  'gemini-2.5-pro': 61,
  'gemini-2.5-flash': 142,
  'mistral-large': 86,
  'pixtral-large': 64,
  'llama-3.3-70b': 284,
  'command-r-plus': 0,
}

const modelParameters: Record<string, string> = {
  'gpt-4.1': 'Não divulgado',
  'gpt-4.1-mini': 'Não divulgado',
  'o4-mini': 'Não divulgado',
  'text-embedding-3': 'Não divulgado',
  'whisper-large-v3': '1,55 bi',
  'gpt-4o': 'Não divulgado',
  'claude-sonnet-4-5': 'Não divulgado',
  'claude-haiku-4-5': 'Não divulgado',
  'claude-opus-4-1': 'Não divulgado',
  'gemini-2.5-pro': 'Não divulgado',
  'gemini-2.5-flash': 'Não divulgado',
  'mistral-large': '123 bi',
  'pixtral-large': '124 bi',
  'llama-3.3-70b': '70 bi',
  'command-r-plus': '104 bi',
}

function formatDateBr(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value
}

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
        (typeFilter === 'all' || m.categories.includes(typeFilter as Model['categories'][number])) &&
        (healthFilter === 'all' || m.health === healthFilter) &&
        (q === '' ||
          m.name.toLowerCase().includes(q) ||
          m.displayName.toLowerCase().includes(q) ||
          m.gatewayId.toLowerCase().includes(q) ||
          m.categories.some((category) => category.toLowerCase().includes(q)) ||
          providerName(m.providerId).toLowerCase().includes(q)),
    )
  }, [state.models, state.providers, query, providerFilter, typeFilter, healthFilter])

  const hasActiveFilters = query !== '' || providerFilter !== 'all' || typeFilter !== 'all' || healthFilter !== 'all'
  const available = state.models.filter((m) => m.catalog === 'enabled' && m.health === 'operational').length
  const degraded = state.models.filter((m) => m.health !== 'operational').length
  const maxContext = Math.max(...state.models.map((m) => m.contextTokens))
  const types = [...new Set(state.models.flatMap((m) => m.categories))]

  const summary = [
    { label: 'Modelos', value: fmtNumber(state.models.length), suffix: 'no gateway' },
    { label: 'Disponíveis', value: fmtNumber(available), suffix: 'agora' },
    { label: 'Incidentes', value: fmtNumber(degraded), suffix: 'modelos' },
    { label: 'Contexto máximo', value: fmtTokens(maxContext), suffix: 'tokens' },
  ]

  return (
    <>
      <PageHeader
        title="Modelos"
        description="Consulte limites, preços, capacidades e confiabilidade dos modelos provisionados e mantidos pelo gateway Nylla. Este catálogo é somente leitura."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <article
            key={item.label}
            className="flex min-h-24 flex-col justify-between border border-border/35 bg-transparent px-4 py-3.5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
              {item.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="font-mono text-2xl tabular-nums leading-none tracking-tight text-foreground">
                {item.value}
              </p>
              <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-subtle-foreground">
                {item.suffix}
              </p>
            </div>
          </article>
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
          <div className="w-44">
            <NativeSelect
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filtrar por categoria"
            >
              <option value="all">Todas as categorias</option>
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
                  'relative flex flex-col border border-border/35 bg-card text-left',
                  'focus-visible:outline-1 focus-visible:outline-ring',
                  model.catalog === 'deprecated' && 'opacity-60',
                )}
              >
                {/* Filete de saúde no topo */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 top-0 h-px',
                    model.health === 'operational' && 'bg-term-success/70',
                    model.health === 'degraded' && 'bg-status-warning/70',
                    model.health === 'down' && 'bg-destructive/60',
                  )}
                />

                <header className="flex items-start justify-between gap-3 p-4 pb-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate font-mono text-[13px] tracking-tight text-foreground" data-no-translate>
                      {model.name}
                    </span>
                    <span className="truncate text-[11px] text-subtle-foreground">
                      {providerName(model.providerId)}
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
                  <div className="flex flex-col items-end gap-2 pb-0.5">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-mono text-[13px] tabular-nums text-foreground">
                        {modelParameters[model.id]}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                        Parâmetros
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
                        {model.maxOutputTokens > 0 ? fmtTokens(model.maxOutputTokens) : 'n/d'}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                        Saída máx.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 px-4 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                      Uso 30d
                    </span>
                    <span className="font-mono text-[12px] tabular-nums text-term-success">
                      {fmtPercent(model.trafficPct, 0)}
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-border/50" aria-hidden="true">
                    <div
                      className="h-full bg-term-success"
                      style={{ width: `${Math.min(100, model.trafficPct)}%` }}
                    />
                  </div>
                </div>

                {/* Preço + capacidades em rodapé denso */}
                <div className="mt-auto grid grid-cols-2 gap-px bg-border/20">
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
                  <div className="flex flex-wrap gap-1">
                    {model.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-foreground/8 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-foreground"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <span
                    className={cn(
                      'font-mono text-[10px] tabular-nums',
                      averageTokensPerSecond[model.id] > 0 ? 'text-term-success' : 'text-subtle-foreground',
                    )}
                    title="M��dia de tokens gerados por segundo"
                  >
                    {averageTokensPerSecond[model.id] > 0
                      ? `${averageTokensPerSecond[model.id]} tok/s`
                      : 'sem tráfego'}
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
        description={detail ? providerName(detail.providerId) : undefined}
        side="right"
        showHeaderBorder={false}
      >
        {detail && (
          <div className="flex flex-col">
            {/* Status */}
            <div className="flex items-center gap-1.5 px-5 pb-4 font-mono text-[9px] uppercase tracking-[0.1em]">
              <span className="text-subtle-foreground">Status:</span>
              <span
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5',
                  detail.health === 'operational' && 'text-term-success',
                  detail.health === 'degraded' && 'text-status-warning',
                  detail.health === 'down' && 'text-destructive',
                )}
              >
                <span
                  className={cn('size-1 bg-current', detail.health !== 'down' && 'animate-pulse')}
                  aria-hidden="true"
                />
                {healthMeta[detail.health].label}
              </span>
            </div>

            {/* ID no gateway */}
            <div className="mx-5 flex items-center justify-between gap-3 border border-border/35 bg-muted/20 px-3 py-2.5">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                  ID no gateway
                </span>
                <code className="truncate font-mono text-[12px] text-foreground" data-no-translate>
                  {detail.gatewayId}
                </code>
              </div>
              <CopyIdButton value={detail.gatewayId} />
            </div>

            {/* Métricas-herói */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4">
              <div className="flex flex-col gap-1 bg-card px-5 py-4">
                <span className="font-mono text-[20px] leading-none tabular-nums tracking-tight text-foreground">
                  {fmtTokens(detail.contextTokens)}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                  Contexto
                </span>
              </div>
              <div className="flex flex-col gap-1 bg-card px-5 py-4">
                <span className="font-mono text-[20px] leading-none tabular-nums tracking-tight text-foreground">
                  {detail.maxOutputTokens > 0 ? fmtTokens(detail.maxOutputTokens) : '—'}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                  Saída máx.
                </span>
              </div>
              <div className="flex flex-col gap-1 bg-card px-5 py-4">
                <span className="whitespace-nowrap font-mono text-[14px] leading-none tabular-nums tracking-tight text-foreground">
                  {modelParameters[detail.id]}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                  Parâmetros
                </span>
              </div>
              <div className="flex flex-col gap-1 bg-card px-5 py-4">
                <span
                  className={cn(
                    'font-mono text-[20px] leading-none tabular-nums tracking-tight',
                    averageTokensPerSecond[detail.id] > 0 ? 'text-term-success' : 'text-subtle-foreground',
                  )}
                >
                  {averageTokensPerSecond[detail.id] > 0 ? averageTokensPerSecond[detail.id] : '—'}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                  tok/s médio
                </span>
              </div>
            </div>

            {/* Uso 30d */}
            <section className="flex flex-col gap-3 px-5 py-5" aria-label="Uso nos últimos 30 dias">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Uso 30d</h3>
                <span className="font-mono text-[13px] tabular-nums text-term-success">
                  {fmtPercent(detail.trafficPct, 0)}
                </span>
              </div>
              <div className="h-0.5 w-full bg-border/50" aria-hidden="true">
                <div
                  className="h-full bg-term-success"
                  style={{ width: `${Math.min(100, detail.trafficPct)}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {fmtCompact(detail.requests30d)} requisições
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {fmtCompact(detail.tokens30d)} tokens
                </span>
              </div>
            </section>

            {/* Preço */}
            <section className="flex flex-col gap-2.5 border-t border-border/35 px-5 py-5" aria-label="Preço">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
                Preço por 1M tokens
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                    Entrada
                  </span>
                  <span className="font-mono text-[15px] tabular-nums text-foreground">
                    {fmtCurrency(detail.inputPrice)}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                    Saída
                  </span>
                  <span className="font-mono text-[15px] tabular-nums text-foreground">
                    {detail.outputPrice > 0 ? fmtCurrency(detail.outputPrice) : '—'}
                  </span>
                </div>
              </div>
            </section>

            {/* Capacidades */}
            <section className="flex flex-col gap-2.5 border-t border-border/35 px-5 py-5" aria-label="Capacidades">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
                Capacidades
              </h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {detail.categories.map((category) => (
                  <li key={category} className="flex items-center justify-between gap-2">
                    <span className="text-[12px] text-foreground">{categoryLabels[category]}</span>
                    <Check className="size-3 text-term-success" aria-label="Suportado" />
                  </li>
                ))}
              </ul>
            </section>

            {/* Especificações */}
            <section className="flex flex-col gap-2.5 border-t border-border/35 px-5 py-5" aria-label="Especificações">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
                Especificações
              </h3>
              <dl className="flex flex-col gap-2">
                {(
                  [
                    ['Nome técnico', detail.name],
                    ['Versão', formatDateBr(detail.version)],
                    ['Knowledge cutoff', detail.knowledgeCutoff],
                    ['Catálogo', catalogMeta[detail.catalog].label],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[12px] text-muted-foreground">{label}</dt>
                    <dd className="text-right font-mono text-[12px] tabular-nums text-foreground" data-no-translate>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mx-5 mb-5 flex items-start gap-2 border border-border/50 bg-muted/35 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Lock className="mt-0.5 size-3 shrink-0 text-subtle-foreground" aria-hidden="true" />
              <p>
                {catalogMeta[detail.catalog].hint} A configuração é gerenciada pelo gateway Nylla e não pode ser
                alterada no painel.
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}

function CopyIdButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      className="flex size-7 shrink-0 items-center justify-center border border-border/35 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-1 focus-visible:outline-ring"
      aria-label={copied ? 'ID copiado' : 'Copiar ID do gateway'}
    >
      {copied ? <Check className="size-3.5 text-term-success" /> : <CopyIcon className="size-3.5" />}
    </button>
  )
}
