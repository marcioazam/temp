'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Copy, RotateCcw, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { LogEntry } from '@/lib/painel/data'
import { fmtCompact, fmtLatency, fmtNumber } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Dialog } from '@/components/painel/ui/dialog'
import { NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Segmented } from '@/components/painel/ui/segmented'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 30

type StatusFilter = 'all' | '2xx' | '4xx' | '5xx'
type PeriodFilter = 'all' | '1h' | '24h' | '7d' | 'custom'

const periodMinutes: Record<Exclude<PeriodFilter, 'all' | 'custom'>, number> = {
  '1h': 60,
  '24h': 1440,
  '7d': 10_080,
}

function logTimestamp(datetime: string) {
  const [date, time] = datetime.split(' ')
  const [day, month, year] = date.split('/').map(Number)
  const [hour, minute, second] = time.split(':').map(Number)
  return Date.UTC(year, month - 1, day, hour, minute, second)
}

function isInCustomRange(log: LogEntry, start: string, end: string) {
  if (!start || !end) return false
  const timestamp = logTimestamp(log.datetime)
  const startAt = new Date(`${start}T00:00:00Z`).getTime()
  const endAt = new Date(`${end}T23:59:59.999Z`).getTime()
  return timestamp >= startAt && timestamp <= endAt
}

function statusTone(status: number) {
  if (status >= 500) return 'danger' as const
  if (status >= 400) return 'warning' as const
  return 'success' as const
}

function shortDatetime(datetime: string) {
  // "29/08/2026 14:32:05" → "29/08 14:32:05"
  return `${datetime.slice(0, 5)} ${datetime.slice(11)}`
}

function CopyIdButton({ id, className }: { id: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className={className}
      aria-label={`Copiar ID da requisição ${id}`}
      title="Copiar ID"
      onClick={async (event) => {
        event.stopPropagation()
        try {
          await navigator.clipboard.writeText(id)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1600)
        } catch {
          // clipboard indisponível
        }
      }}
    >
      {copied ? <Check className="text-term-success" /> : <Copy />}
    </Button>
  )
}

export default function LogsPage() {
  const { state } = usePainel()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [modelFilter, setModelFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all')
  const [customStart, setCustomStart] = useState('2026-08-22')
  const [customEnd, setCustomEnd] = useState('2026-08-29')
  const [page, setPage] = useState(1)
  const [detail, setDetail] = useState<LogEntry | null>(null)
  const [replaying, setReplaying] = useState(false)

  const models = useMemo(
    () => [...new Set(state.logs.map((l) => l.model))].sort(),
    [state.logs],
  )

  const filtered = useMemo(
    () =>
      state.logs.filter((l) => {
        if (statusFilter === '2xx' && l.status >= 300) return false
        if (statusFilter === '4xx' && (l.status < 400 || l.status >= 500)) return false
        if (statusFilter === '5xx' && l.status < 500) return false
        if (modelFilter !== 'all' && l.model !== modelFilter) return false
        if (periodFilter === 'custom' && !isInCustomRange(l, customStart, customEnd)) return false
        if (periodFilter !== 'all' && periodFilter !== 'custom' && l.ageMinutes > periodMinutes[periodFilter]) return false
        const q = query.trim().toLowerCase()
        if (q && !`${l.id} ${l.model} ${l.endpoint}`.toLowerCase().includes(q)) return false
        return true
      }),
    [state.logs, statusFilter, modelFilter, periodFilter, customStart, customEnd, query],
  )

  const periodSummary = useMemo(() => {
    const logsInPeriod = state.logs.filter((log) => {
      if (periodFilter === 'all') return true
      if (periodFilter === 'custom') return isInCustomRange(log, customStart, customEnd)
      return log.ageMinutes <= periodMinutes[periodFilter]
    })

    return {
      requests: logsInPeriod.length,
      tokens: logsInPeriod.reduce((total, log) => total + log.tokensIn + log.tokensOut, 0),
    }
  }, [state.logs, periodFilter, customStart, customEnd])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length)

  const hasActiveFilters =
    query.trim() !== '' || statusFilter !== 'all' || modelFilter !== 'all' || periodFilter !== 'all'

  function resetFilters() {
    setQuery('')
    setStatusFilter('all')
    setModelFilter('all')
    setPeriodFilter('all')
    setPage(1)
  }

  function replay() {
    setReplaying(true)
    window.setTimeout(() => setReplaying(false), 900)
  }

  return (
    <>
      <PageHeader
        title="Logs"
        description="Todas as requisições roteadas pelo gateway, com status, latência e tokens por chamada."
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" />
          <TextInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Buscar por id, modelo, endpoint…"
            className="pl-8"
            aria-label="Buscar requisições"
          />
        </div>
        <Segmented
          label="Filtrar por status"
          value={statusFilter}
          onChange={(v) => {
            setStatusFilter(v)
            setPage(1)
          }}
          options={[
            { value: 'all', label: 'Todos' },
            { value: '2xx', label: '2xx' },
            { value: '4xx', label: '4xx' },
            { value: '5xx', label: '5xx' },
          ]}
        />
        <NativeSelect
          value={modelFilter}
          onChange={(e) => {
            setModelFilter(e.target.value)
            setPage(1)
          }}
          className="w-auto min-w-44 pr-2.5"
          showChevron={false}
          aria-label="Filtrar por modelo"
        >
          <option value="all">Todos os modelos</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </NativeSelect>
        <Segmented
          label="Filtrar por período"
          value={periodFilter}
          onChange={(v) => {
            setPeriodFilter(v)
            setPage(1)
          }}
          options={[
            { value: 'all', label: 'Tudo' },
            { value: '1h', label: '1h' },
            { value: '24h', label: '24h' },
            { value: '7d', label: '7d' },
            { value: 'custom', label: 'Personalizado' },
          ]}
        />
        {hasActiveFilters && (
          <Button variant="ghost" size="xs" onClick={resetFilters} className="font-mono text-[10px] uppercase tracking-wide">
            <X className="size-3" />
            Limpar filtros
          </Button>
        )}
      </div>

      {periodFilter === 'custom' && (
        <div className="flex flex-wrap items-end gap-3 border-l border-border/50 pl-3">
          <label className="flex min-w-40 flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle-foreground">
            Data inicial
            <TextInput
              type="date"
              value={customStart}
              max={customEnd}
              onChange={(event) => {
                setCustomStart(event.target.value)
                setPage(1)
              }}
              className="font-mono text-[11px] text-foreground"
            />
          </label>
          <label className="flex min-w-40 flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-subtle-foreground">
            Data final
            <TextInput
              type="date"
              value={customEnd}
              min={customStart}
              onChange={(event) => {
                setCustomEnd(event.target.value)
                setPage(1)
              }}
              className="font-mono text-[11px] text-foreground"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] leading-none">
        {[
          { label: 'Requisições no período', value: fmtNumber(periodSummary.requests) },
          { label: 'Tokens no período', value: fmtCompact(periodSummary.tokens) },
        ].map((summary) => (
          <div key={summary.label} className="flex items-center gap-2">
            <span className="uppercase tracking-[0.12em] text-subtle-foreground">{summary.label}</span>
            <span className="tabular-nums text-foreground">{summary.value}</span>
          </div>
        ))}
      </div>

      <Table className="border-border/35 bg-muted/20">
        <THead>
          <tr>
            <TH>ID da requisição</TH>
            <TH className="hidden sm:table-cell">Data/hora</TH>
            <TH>Modelo</TH>
            <TH>Status</TH>
            <TH className="text-right">Latência</TH>
            <TH className="hidden text-right lg:table-cell">Tokens in</TH>
            <TH className="hidden text-right lg:table-cell">Tokens out</TH>
            <TH className="text-right">Total tokens</TH>
          </tr>
        </THead>
        <TBody>
          {pageItems.map((log) => (
            <TR key={log.id} onClick={() => setDetail(log)}>
              <TD>
                <div className="flex items-center gap-1">
                  <span className="inline-block max-w-36 truncate font-mono text-[12px] text-muted-foreground" data-no-translate title={log.id}>
                    {log.id}
                  </span>
                  <CopyIdButton id={log.id} />
                </div>
              </TD>
              <TD className="hidden font-mono text-[11px] tabular-nums text-subtle-foreground sm:table-cell" title={log.datetime}>
                {shortDatetime(log.datetime)}
              </TD>
              <TD>
                <span className="font-mono text-[12px]" data-no-translate>{log.model}</span>
              </TD>
              <TD>
                <StatusBadge tone={statusTone(log.status)} dot={false}>
                  {log.status}
                </StatusBadge>
              </TD>
              <TD className="text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                {fmtLatency(log.latencyMs)}
              </TD>
              <TD className="hidden text-right font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {fmtNumber(log.tokensIn)}
              </TD>
              <TD className="hidden text-right font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {fmtNumber(log.tokensOut)}
              </TD>
              <TD className="text-right font-mono text-[12px] tabular-nums text-foreground">
                {fmtNumber(log.tokensIn + log.tokensOut)}
              </TD>
            </TR>
          ))}
          {pageItems.length === 0 && (
            <TR>
              <TD colSpan={8} className="py-10 text-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[13px] text-muted-foreground">Nenhuma requisição corresponde aos filtros.</p>
                  {hasActiveFilters && (
                    <Button variant="outline" size="xs" onClick={resetFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              </TD>
            </TR>
          )}
        </TBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] tabular-nums text-subtle-foreground">
          {filtered.length > 0 ? `Mostrando ${rangeStart}–${rangeEnd} de ${fmtNumber(filtered.length)}` : 'Nenhum resultado'}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tabular-nums text-subtle-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-3.5" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Próxima página"
          >
            Próxima
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>

      <Dialog
        open={detail !== null}
        onOpenChange={(o) => {
          if (!o) setDetail(null)
        }}
        title="Detalhes da requisição"
        description={detail ? `${detail.endpoint} · ${detail.time}` : undefined}
        side="right"
      >
        {detail && (
          <div className="flex flex-col gap-5 p-5">
            <div className="flex items-center gap-2 border border-border bg-background p-3">
              <code className="min-w-0 flex-1 break-all font-mono text-[12px] text-foreground" data-no-translate>
                {detail.id}
              </code>
              <CopyIdButton id={detail.id} />
            </div>

            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: 'Status', value: String(detail.status) },
                { label: 'Latência', value: fmtLatency(detail.latencyMs) },
                { label: 'Tokens de entrada', value: fmtNumber(detail.tokensIn) },
                { label: 'Tokens de saída', value: fmtNumber(detail.tokensOut) },
                { label: 'Total de tokens', value: fmtNumber(detail.tokensIn + detail.tokensOut) },
                { label: 'Data/hora', value: detail.datetime },
                { label: 'Chave de API', value: detail.apiKey },
                { label: 'Endpoint', value: detail.endpoint },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 bg-card p-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">{item.label}</span>
                  <span className="break-all font-mono text-[13px] tabular-nums text-foreground" data-no-translate>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Linha do tempo</p>
              <ol className="flex flex-col">
                {[
                  { step: 'Recebida no gateway', ms: '0 ms', ok: true },
                  { step: 'Roteamento e política aplicados', ms: '4 ms', ok: true },
                  { step: `Roteada para o modelo ${detail.model}`, ms: '11 ms', ok: true },
                  {
                    step: detail.status === 200 ? 'Resposta transmitida (stream)' : `Falha na chamada (${detail.status})`,
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
