'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { heatmapSeed, usageSeries } from '@/lib/painel/data'
import { fmtCompact, fmtCurrency, fmtLatency, fmtPercent } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { StatCard } from '@/components/painel/ui/stat-card'
import { AreaChart, YearHeatmap } from '@/components/painel/ui/charts'
import { Button } from '@/components/ui/button'

type Range = '24h' | '7d' | '30d'

const providerTone = {
  operational: 'success',
  degraded: 'warning',
  paused: 'muted',
} as const

const providerLabel = {
  operational: 'Operacional',
  degraded: 'Degradado',
  paused: 'Pausado',
} as const

export default function OverviewPage() {
  const { state, dispatch } = usePainel()
  const [range, setRange] = useState<Range>('7d')
  const [metric, setMetric] = useState<'requests' | 'cost'>('requests')
  const [refreshing, setRefreshing] = useState(false)

  const series = usageSeries[range]
  const totalRequests = series.reduce((acc, p) => acc + p.requests, 0)
  const totalCost = series.reduce((acc, p) => acc + p.cost, 0)
  const doneCount = state.checklist.filter((c) => c.done).length
  const allDone = doneCount === state.checklist.length

  const topModels = [...state.models]
    .filter((m) => m.status === 'active')
    .sort((a, b) => b.trafficPct - a.trafficPct)
    .slice(0, 5)

  function refresh() {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <>
      <PageHeader
        title="Visão geral"
        description="Acompanhe uso, custo e a saúde dos provedores do workspace Nylla Labs."
        actions={
          <Button variant="outline" size="sm" onClick={refresh} disabled={refreshing}>
            <RefreshCw className={cn('size-3.5', refreshing && 'animate-spin')} />
            Atualizar
          </Button>
        }
      />

      {!allDone && (
        <section className="border border-border/50 bg-muted/25" aria-label="Configuração inicial">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[13px] text-foreground">Configuração inicial</p>
            <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {doneCount} de {state.checklist.length}
            </p>
          </div>
          <ul className="grid sm:grid-cols-5">
            {state.checklist.map((item) => (
              <li key={item.id} className="bg-transparent">
                <button
                  type="button"
                  disabled={item.done}
                  onClick={() => dispatch({ type: 'complete_checklist', id: item.id })}
                  className={cn(
                    'flex h-full w-full items-start gap-2 px-3 py-3 text-left text-[12px] leading-snug transition-colors',
                    item.done ? 'text-subtle-foreground' : 'text-foreground hover:bg-muted/50',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border',
                      item.done ? 'border-term-success/50 text-term-success' : 'border-border',
                    )}
                  >
                    {item.done && <Check className="size-2.5" />}
                  </span>
                  <span className={cn(item.done && 'line-through')}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border border-border bg-muted/25" aria-label="Uso">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-4">
            <p className="text-[13px] text-foreground">Uso</p>
            <div className="flex border border-border" role="group" aria-label="Métrica">
              {(['requests', 'cost'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetric(m)}
                  aria-pressed={metric === m}
                  className={cn(
                    'px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors',
                    metric === m ? 'bg-muted text-primary' : 'text-subtle-foreground hover:text-muted-foreground',
                  )}
                >
                  {m === 'requests' ? 'Requisições' : 'Custo'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex border border-border" role="group" aria-label="Período">
            {(['24h', '7d', '30d'] as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                className={cn(
                  'px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors',
                  range === r ? 'bg-muted text-primary' : 'text-subtle-foreground hover:text-muted-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-4">
          <AreaChart data={series} metric={metric} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border bg-card" aria-label="Atividade recente">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-[13px] text-foreground">Atividade</p>
            <Link href="/painel/logs" className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary">
              Ver logs <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {state.activity.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-baseline gap-3 px-4 py-2.5">
                <span className="mt-1 size-1 shrink-0 bg-primary" aria-hidden="true" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[12px] text-foreground">{item.text}</span>
                  <span className="truncate text-[11px] text-subtle-foreground">{item.detail}</span>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-subtle-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-border bg-card" aria-label="Modelos em alta">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-[13px] text-foreground">Modelos em alta</p>
            <Link href="/painel/models" className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary">
              Ver todos <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {topModels.map((model, i) => (
              <li key={model.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="w-4 font-mono text-[10px] tabular-nums text-subtle-foreground">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">{model.name}</span>
                <div className="hidden h-1 w-24 bg-muted sm:block" aria-hidden="true">
                  <div className="h-full bg-primary/70" style={{ width: `${(model.trafficPct / topModels[0].trafficPct) * 100}%` }} />
                </div>
                <span className="w-12 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {fmtPercent(model.trafficPct, 0)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="border border-border bg-card" aria-label="Provedores">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-[13px] text-foreground">Provedores</p>
          <Link href="/painel/providers" className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary">
            Gerenciar <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {state.providers.map((p) => (
            <div key={p.id} className="flex flex-col gap-2.5 bg-card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] text-foreground">{p.name}</span>
                <StatusBadge tone={providerTone[p.status]}>{providerLabel[p.status]}</StatusBadge>
              </div>
              <dl className="grid grid-cols-3 gap-2 font-mono text-[11px] tabular-nums">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[9px] uppercase tracking-wide text-subtle-foreground">Latência</dt>
                  <dd className="text-muted-foreground">{p.status === 'paused' ? '—' : fmtLatency(p.latencyMs)}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[9px] uppercase tracking-wide text-subtle-foreground">Erro</dt>
                  <dd className={cn(p.errorRate > 1 ? 'text-destructive' : 'text-muted-foreground')}>
                    {p.status === 'paused' ? '—' : fmtPercent(p.errorRate, 2)}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[9px] uppercase tracking-wide text-subtle-foreground">Custo/mês</dt>
                  <dd className="text-muted-foreground">{fmtCurrency(p.monthCost)}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border bg-card" aria-label="Atividade anual">
        <div className="border-b border-border px-4 py-3">
          <p className="text-[13px] text-foreground">Atividade de requisições — últimos 12 meses</p>
        </div>
        <div className="px-4 py-4">
          <YearHeatmap data={heatmapSeed} />
        </div>
      </section>
    </>
  )
}
