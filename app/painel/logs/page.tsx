'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { LogEntry } from '@/lib/painel/data'
import { fmtCurrencyPrecise, fmtLatency, fmtNumber } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Dialog } from '@/components/painel/ui/dialog'
import { NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

function statusTone(status: number) {
  if (status >= 500) return 'danger' as const
  if (status >= 400) return 'warning' as const
  return 'success' as const
}

export default function LogsPage() {
  const { state } = usePainel()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [providerFilter, setProviderFilter] = useState('all')
  const [detail, setDetail] = useState<LogEntry | null>(null)
  const [replaying, setReplaying] = useState(false)

  const providers = useMemo(
    () => [...new Set(state.logs.map((l) => l.provider))].sort(),
    [state.logs],
  )

  const filtered = useMemo(
    () =>
      state.logs.filter((l) => {
        if (statusFilter === '2xx' && l.status >= 300) return false
        if (statusFilter === '4xx' && (l.status < 400 || l.status >= 500)) return false
        if (statusFilter === '5xx' && l.status < 500) return false
        if (providerFilter !== 'all' && l.provider !== providerFilter) return false
        const q = query.trim().toLowerCase()
        if (q && !`${l.id} ${l.model} ${l.provider} ${l.endpoint}`.toLowerCase().includes(q)) return false
        return true
      }),
    [state.logs, statusFilter, providerFilter, query],
  )

  function replay() {
    setReplaying(true)
    window.setTimeout(() => setReplaying(false), 900)
  }

  return (
    <>
      <PageHeader
        title="Logs"
        description="Todas as requisições roteadas pelo gateway, com latência, tokens e custo por chamada."
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por id, modelo, endpoint…"
            className="pl-8"
            aria-label="Buscar requisições"
          />
        </div>
        <NativeSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-auto min-w-28"
          aria-label="Filtrar por status"
        >
          <option value="all">Todos os status</option>
          <option value="2xx">2xx — Sucesso</option>
          <option value="4xx">4xx — Cliente</option>
          <option value="5xx">5xx — Servidor</option>
        </NativeSelect>
        <NativeSelect
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="w-auto min-w-36"
          aria-label="Filtrar por provedor"
        >
          <option value="all">Todos os provedores</option>
          {providers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </NativeSelect>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-subtle-foreground">
          {filtered.length} de {state.logs.length} requisições
        </span>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Requisição</TH>
            <TH className="hidden sm:table-cell">Horário</TH>
            <TH>Modelo</TH>
            <TH className="hidden md:table-cell">Provedor</TH>
            <TH>Status</TH>
            <TH className="hidden lg:table-cell">Latência</TH>
            <TH className="hidden lg:table-cell">Tokens</TH>
            <TH className="text-right">Custo</TH>
          </tr>
        </THead>
        <TBody>
          {filtered.map((log) => (
            <TR key={log.id} onClick={() => setDetail(log)}>
              <TD>
                <span className="font-mono text-[12px] text-muted-foreground" data-no-translate>{log.id}</span>
              </TD>
              <TD className="hidden font-mono text-[11px] text-subtle-foreground sm:table-cell">{log.time}</TD>
              <TD>
                <span className="font-mono text-[12px]" data-no-translate>{log.model}</span>
              </TD>
              <TD className="hidden text-muted-foreground md:table-cell">{log.provider}</TD>
              <TD>
                <StatusBadge tone={statusTone(log.status)} dot={false}>
                  {log.status}
                </StatusBadge>
              </TD>
              <TD className="hidden font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {fmtLatency(log.latencyMs)}
              </TD>
              <TD className="hidden font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {fmtNumber(log.tokensIn + log.tokensOut)}
              </TD>
              <TD className="text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                {log.cost > 0 ? fmtCurrencyPrecise(log.cost) : '—'}
              </TD>
            </TR>
          ))}
          {filtered.length === 0 && (
            <TR>
              <TD colSpan={8} className="py-10 text-center text-subtle-foreground">
                Nenhuma requisição corresponde aos filtros.
              </TD>
            </TR>
          )}
        </TBody>
      </Table>

      <Dialog
        open={detail !== null}
        onOpenChange={(o) => {
          if (!o) setDetail(null)
        }}
        title={detail?.id ?? ''}
        description={detail ? `${detail.endpoint} · ${detail.time}` : undefined}
        side="right"
      >
        {detail && (
          <div className="flex flex-col gap-5 p-5">
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: 'Status', value: String(detail.status) },
                { label: 'Latência', value: fmtLatency(detail.latencyMs) },
                { label: 'Tokens de entrada', value: fmtNumber(detail.tokensIn) },
                { label: 'Tokens de saída', value: fmtNumber(detail.tokensOut) },
                { label: 'Custo', value: detail.cost > 0 ? fmtCurrencyPrecise(detail.cost) : '—' },
                { label: 'Chave de API', value: detail.apiKey },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 bg-card p-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">{item.label}</span>
                  <span className="font-mono text-[13px] tabular-nums text-foreground" data-no-translate>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Linha do tempo</p>
              <ol className="flex flex-col">
                {[
                  { step: 'Recebida no gateway', ms: '0 ms', ok: true },
                  { step: 'Roteamento e política aplicados', ms: '4 ms', ok: true },
                  { step: `Enviada para ${detail.provider}`, ms: '11 ms', ok: true },
                  {
                    step: detail.status === 200 ? 'Resposta transmitida (stream)' : `Falha do provedor (${detail.status})`,
                    ms: fmtLatency(detail.latencyMs),
                    ok: detail.status === 200,
                  },
                ].map((item, i, arr) => (
                  <li key={item.step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={cn('mt-1 size-1.5 shrink-0', item.ok ? 'bg-term-success' : 'bg-destructive')} />
                      {i < arr.length - 1 && <span className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex flex-1 items-baseline justify-between gap-3 pb-3.5">
                      <span className="text-[12px] text-foreground">{item.step}</span>
                      <span className="font-mono text-[10px] tabular-nums text-subtle-foreground">{item.ms}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Payload (resumo)</p>
              <pre className="overflow-x-auto border border-border bg-background p-3 font-mono text-[11px] leading-relaxed text-muted-foreground" data-no-translate>
{JSON.stringify(
  {
    model: detail.model,
    endpoint: detail.endpoint,
    stream: true,
    usage: { prompt_tokens: detail.tokensIn, completion_tokens: detail.tokensOut },
  },
  null,
  2,
)}
              </pre>
            </div>

            <div className="flex justify-end border-t border-border pt-4">
              <Button variant="outline" size="sm" onClick={replay} disabled={replaying}>
                <RotateCcw className={cn('size-3.5', replaying && 'animate-spin')} />
                {replaying ? 'Reexecutando…' : 'Reexecutar requisição'}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}
