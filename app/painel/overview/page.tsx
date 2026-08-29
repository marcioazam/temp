'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { heatmapSeed, usageSeries } from '@/lib/painel/data'
import { fmtCompact, fmtPercent } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatCard } from '@/components/painel/ui/stat-card'
import { AreaChart, Sparkline, YearHeatmap, type ChartShape } from '@/components/painel/ui/charts'
import { Segmented } from '@/components/painel/ui/segmented'
import { Button } from '@/components/ui/button'

type Range = '24h' | '7d' | '30d'

const rangeLabel: Record<Range, string> = {
  '24h': 'últimas 24 horas',
  '7d': 'últimos 7 dias',
  '30d': 'últimos 30 dias',
}

// Sparklines determinísticos por KPI (tendência de demonstração).
// `quality: true` = métrica de desempenho, recebe verde (bom) ou vermelho (ruim).
// `invert: true` = queda é o resultado desejado (latência, tempo de resposta, erros).
// Volume puro (requisições, tokens) usa verde na variação, independentemente do sinal.
const kpis = [
  { label: 'Requisições', value: '452.890', delta: 12.0, spark: [28, 31, 30, 34, 36, 35, 39, 41, 40, 44, 46, 49] },
  { label: 'Tokens', value: '1,8 bi', delta: 8.0, spark: [40, 42, 41, 44, 43, 46, 48, 47, 50, 52, 51, 54] },
  { label: 'Tempo de resposta', value: '12,4 h', delta: -9.2, spark: [54, 52, 53, 49, 47, 48, 44, 43, 40, 41, 37, 35], invert: true, quality: true },
  { label: 'Latência média', value: '428 ms', delta: -6.0, spark: [52, 50, 51, 48, 47, 49, 45, 44, 46, 42, 41, 39], invert: true, quality: true },
  { label: 'Taxa de sucesso', value: '98,7%', delta: 0.4, spark: [44, 45, 43, 46, 45, 47, 46, 48, 47, 48, 49, 48], quality: true },
  { label: 'Erros (24h)', value: '214', delta: -18.0, spark: [58, 55, 56, 52, 50, 51, 46, 44, 45, 40, 38, 34], invert: true, quality: true },
] as const

function KpiCard({
  label,
  value,
  delta,
  spark,
  invert = false,
  quality = false,
}: {
  label: string
  value: string
  delta: number
  spark: readonly number[]
  invert?: boolean
  quality?: boolean
}) {
  // Para métricas em que queda é positiva (latência, erros), o tom acompanha o benefício.
  const good = invert ? delta <= 0 : delta >= 0
  return (
    <div className="group flex flex-col gap-2 border border-border/35 bg-muted/20 p-4 transition-colors hover:border-border/60">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-xl tabular-nums leading-none text-foreground">{value}</p>
          <p
            className={cn(
              'font-mono text-[11px] tabular-nums leading-none',
              quality ? (good ? 'text-term-success' : 'text-destructive') : 'text-term-success',
            )}
          >
            {delta >= 0 ? '+' : ''}
            {delta.toFixed(1).replace('.', ',')}%
          </p>
        </div>
        <Sparkline
          data={[...spark]}
          tone={quality ? (good ? 'up' : 'down') : 'neutral'}
          className="opacity-55 transition-opacity group-hover:opacity-95"
        />
      </div>
    </div>
  )
}


const providerLabel = {
  operational: 'Operacional',
  degraded: 'Degradado',
  paused: 'Pausado',
} as const

export default function OverviewPage() {
  const { state, dispatch } = usePainel()
  const [range, setRange] = useState<Range>('24h')
  const [metric, setMetric] = useState<'requests' | 'tokens'>('requests')
  const [activityMetric, setActivityMetric] = useState<'requests' | 'tokens'>('requests')
  const [shape, setShape] = useState<ChartShape>('area')
  const [showAvg, setShowAvg] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const series = usageSeries[range]
  const totalRequests = series.reduce((acc, p) => acc + p.requests, 0)
  const totalTokens = series.reduce((acc, p) => acc + p.tokens, 0)

  const half = Math.floor(series.length / 2)
  const firstHalf = series.slice(0, half).reduce((acc, p) => acc + p[metric], 0)
  const secondHalf = series.slice(half).reduce((acc, p) => acc + p[metric], 0)
  const periodDelta = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0
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
          <Button
            size="sm"
            className="h-7 rounded-none border border-foreground bg-foreground px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-background hover:bg-foreground/90"
            onClick={refresh}
            disabled={refreshing}
          >
            <RefreshCw className={cn('size-3.5', refreshing && 'animate-spin')} />
            Atualizar
          </Button>
        }
      />

      {!allDone && (
        <section className="border border-border/35 bg-muted/20" aria-label="Configuração inicial">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-medium tracking-tight text-foreground">Configuração inicial</h2>
            <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {doneCount} de {state.checklist.length}
            </p>
          </div>
          <ul className="flex flex-wrap items-stretch gap-x-2">
            {state.checklist.map((item) => (
              <li key={item.id} className="bg-transparent">
                <button
                  type="button"
                  disabled={item.done}
                  onClick={() => dispatch({ type: 'complete_checklist', id: item.id })}
                  className={cn(
                    'flex h-full items-start gap-2 px-3 py-3 text-left text-[12px] leading-snug transition-colors',
                    item.done ? 'text-subtle-foreground' : 'text-foreground hover:bg-muted/50',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border',
                      item.done ? 'border-term-success text-term-success' : 'border-border',
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

      <section aria-label="Indicadores">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((k) => (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              delta={k.delta}
              spark={k.spark}
              invert={'invert' in k && k.invert}
              quality={'quality' in k && k.quality}
            />
          ))}
        </div>
      </section>

      <section className="border border-border/35 bg-muted/20" aria-label="Uso">
        <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-3 pt-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium tracking-tight text-foreground">Uso</h2>
            <div className="flex items-center gap-2.5 font-mono text-[10px] leading-none">
              <span className="uppercase tracking-[0.12em] text-subtle-foreground">
                {rangeLabel[range]}
              </span>
              <span className="tabular-nums text-foreground">
                {metric === 'requests' ? fmtCompact(totalRequests) : `${fmtCompact(totalTokens)} tok`}
              </span>
              <span className="tabular-nums text-term-success">
                {periodDelta >= 0 ? '+' : ''}
                {periodDelta.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Segmented
              label="Métrica"
              value={metric}
              onChange={setMetric}
              options={[
                { value: 'requests', label: 'Req' },
                { value: 'tokens', label: 'Tokens' },
              ]}
            />
            <Segmented
              label="Visualização"
              value={shape}
              onChange={setShape}
              options={[
                { value: 'area', label: 'Área' },
                { value: 'line', label: 'Linha' },
                { value: 'bars', label: 'Barras' },
              ]}
            />
            <div className="flex h-[30px] items-center border border-foreground/25 bg-background p-0.5 font-mono text-[10px] uppercase tracking-[0.1em]">
              <button
                type="button"
                onClick={() => setShowAvg((v) => !v)}
                aria-pressed={showAvg}
                className={cn(
                  'grid h-6 place-items-center px-1.5 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-foreground',
                  showAvg
                    ? 'bg-foreground text-background'
                    : 'bg-background text-muted-foreground hover:text-foreground',
                )}
              >
                Média
              </button>
            </div>
            <Segmented
              label="Período"
              value={range}
              onChange={setRange}
              options={[
                { value: '24h', label: '24h' },
                { value: '7d', label: '7d' },
                { value: '30d', label: '30d' },
              ]}
            />
          </div>
        </div>
        <div className="px-4 pb-4">
          <AreaChart data={series} metric={metric} shape={shape} showAverage={showAvg} height={200} />
        </div>
      </section>

      <section className="border border-border/35 bg-muted/20" aria-label="Atividade anual">
        <div className="flex items-start justify-between gap-4 px-4 pb-1 pt-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-base font-medium tracking-tight text-foreground">
              Atividade de {activityMetric === 'requests' ? 'requisições' : 'tokens'}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-subtle-foreground">Últimos 12 meses</span>
          </div>
          <Segmented
            label="Métrica da atividade anual"
            value={activityMetric}
            onChange={setActivityMetric}
            options={[
              { value: 'requests', label: 'Req' },
              { value: 'tokens', label: 'Tokens' },
            ]}
          />
        </div>
        <div className="px-4 py-4">
          <YearHeatmap data={heatmapSeed} metric={activityMetric} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border/35 bg-muted/20" aria-label="Atividade recente">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-medium tracking-tight text-foreground">Atividade</h2>
            <Link href="/painel/logs" className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary">
              Ver logs <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ul>
            {state.activity.slice(0, 6).map((item) => (
              <li key={item.id} className="flex items-baseline gap-3 px-4 py-2.5">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[12px] text-foreground">{item.text}</span>
                  <span className="truncate text-[11px] text-subtle-foreground">{item.detail}</span>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-subtle-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-border/35 bg-muted/20" aria-label="Modelos em alta">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-medium tracking-tight text-foreground">Modelos em alta</h2>
            <Link href="/painel/models" className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary">
              Ver todos <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ul>
            {topModels.map((model, i) => (
              <li key={model.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="w-4 font-mono text-[10px] tabular-nums text-subtle-foreground">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">{model.name}</span>
                <div className="hidden h-1 w-24 bg-muted sm:block" aria-hidden="true">
                  <div className="h-full bg-foreground/70" style={{ width: `${(model.trafficPct / topModels[0].trafficPct) * 100}%` }} />
                </div>
                <span className="w-12 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {fmtPercent(model.trafficPct, 0)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

    </>
  )
}
