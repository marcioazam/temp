'use client'

import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { costByTeamSeed, costHistorySeed, usageSeries } from '@/lib/painel/data'
import { fmtCompact, fmtCurrency, fmtPercent } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatCard } from '@/components/painel/ui/stat-card'
import { AreaChart, HBarList, ProgressBar } from '@/components/painel/ui/charts'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Toggle } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

type Segment = 'provider' | 'model' | 'user' | 'team'

const segments: { id: Segment; label: string }[] = [
  { id: 'provider', label: 'Por provedor' },
  { id: 'model', label: 'Por modelo' },
  { id: 'user', label: 'Por usuário' },
  { id: 'team', label: 'Por equipe' },
]

export default function CostsPage() {
  const { state, dispatch } = usePainel()
  const [segment, setSegment] = useState<Segment>('provider')

  const currentCost = 5670.57
  const limit = state.settings.monthlyLimit
  const usedPct = (currentCost / limit) * 100
  const projection = 6420.14
  const previous = 5341.6
  const savings = 1184.22

  const segmentItems = useMemo(() => {
    switch (segment) {
      case 'provider':
        return state.providers
          .filter((p) => p.monthCost > 0)
          .map((p) => ({ name: p.name, value: p.monthCost }))
          .sort((a, b) => b.value - a.value)
      case 'model':
        return state.models
          .filter((m) => m.trafficPct > 0)
          .map((m) => ({ name: m.name, value: Number(((m.trafficPct / 100) * currentCost).toFixed(2)) }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8)
      case 'user':
        return state.members
          .filter((m) => m.spend > 0)
          .map((m) => ({ name: m.name, value: m.spend }))
          .sort((a, b) => b.value - a.value)
      case 'team':
        return costByTeamSeed
    }
  }, [segment, state.providers, state.models, state.members])

  function exportCsv() {
    const rows = [
      ['mes', 'custo_usd', 'requisicoes'],
      ...costHistorySeed.map((m) => [m.month, m.cost.toFixed(2), String(m.requests)]),
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nylla-custos.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PageHeader
        title="Custos"
        description="Custo consolidado do gateway, projeções e orçamentos do workspace."
        actions={
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="size-3.5" />
            Exportar CSV
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Custo em agosto" value={fmtCurrency(currentCost)} hint={`+${fmtPercent(((currentCost - previous) / previous) * 100)} vs. julho`} hintTone="warning" />
        <StatCard label="Projeção do mês" value={fmtCurrency(projection)} hint="Baseada nos últimos 7 dias" />
        <StatCard label="Economia por roteamento" value={fmtCurrency(savings)} hint="vs. preço de tabela dos provedores" hintTone="success" />
        <div className="flex flex-col gap-2 border border-border bg-card p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Orçamento utilizado</p>
          <p className="font-mono text-xl tabular-nums text-foreground">{fmtPercent(usedPct)}</p>
          <ProgressBar value={usedPct} tone={usedPct > 90 ? 'danger' : 'primary'} />
          <p className="text-[11px] text-subtle-foreground">
            Limite mensal: {fmtCurrency(limit)}
          </p>
        </div>
      </div>

      <section className="border border-border bg-card" aria-label="Custo no tempo">
        <div className="border-b border-border px-4 py-3">
          <p className="text-[13px] text-foreground">Custo — últimos 30 dias</p>
        </div>
        <div className="px-4 py-4">
          <AreaChart data={usageSeries['30d']} metric="cost" />
        </div>
      </section>

      <section className="border border-border bg-card" aria-label="Segmentação de custos">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p className="text-[13px] text-foreground">Segmentação</p>
          <div className="flex border border-border" role="group" aria-label="Segmentar custos">
            {segments.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSegment(s.id)}
                aria-pressed={segment === s.id}
                className={cn(
                  'px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors',
                  segment === s.id ? 'bg-primary text-primary-foreground' : 'text-subtle-foreground hover:text-muted-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-4">
          <HBarList items={segmentItems} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="flex flex-col border border-border bg-card" aria-label="Orçamentos e alertas">
          <div className="border-b border-border px-4 py-3">
            <p className="text-[13px] text-foreground">Orçamentos e alertas</p>
          </div>
          <ul className="flex-1 divide-y divide-border">
            {state.budgets.map((b) => (
              <li key={b.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[12px] text-foreground">{b.name}</span>
                  <span className="text-[11px] text-subtle-foreground">{b.action}</span>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{b.threshold}%</span>
                <Toggle
                  checked={b.active}
                  onChange={() => dispatch({ type: 'toggle_budget', id: b.id })}
                  label={`${b.active ? 'Desativar' : 'Ativar'} ${b.name}`}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-border bg-card" aria-label="Histórico mensal">
          <div className="border-b border-border px-4 py-3">
            <p className="text-[13px] text-foreground">Histórico</p>
          </div>
          <Table className="border-0">
            <THead>
              <tr>
                <TH>Mês</TH>
                <TH className="text-right">Requisições</TH>
                <TH className="text-right">Custo</TH>
              </tr>
            </THead>
            <TBody>
              {[...costHistorySeed].reverse().map((m) => (
                <TR key={m.month}>
                  <TD>{m.month}</TD>
                  <TD className="text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                    {fmtCompact(m.requests)}
                  </TD>
                  <TD className="text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                    {fmtCurrency(m.cost)}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </section>
      </div>
    </>
  )
}
