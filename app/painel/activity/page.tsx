'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { TextInput } from '@/components/painel/ui/controls'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Segmented } from '@/components/painel/ui/segmented'
import { Button } from '@/components/ui/button'
import { usePainel } from '@/lib/painel/store'
import type { ActivityItem } from '@/lib/painel/data'

type KindFilter = 'all' | ActivityItem['kind']

const PAGE_SIZE = 20

const kindLabels: Record<ActivityItem['kind'], string> = {
  key: 'Chave',
  model: 'Modelo',
  user: 'Usuário',
  budget: 'Orçamento',
  provider: 'Provedor',
}

export default function ActivityLogsPage() {
  const { state } = usePainel()
  const [query, setQuery] = useState('')
  const [kindFilter, setKindFilter] = useState<KindFilter>('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.activity.filter((item) => {
      if (kindFilter !== 'all' && item.kind !== kindFilter) return false
      if (q && !`${item.text} ${item.detail}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [state.activity, query, kindFilter])

  const hasActiveFilters = query !== '' || kindFilter !== 'all'
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const firstItem = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const lastItem = Math.min(currentPage * PAGE_SIZE, filtered.length)

  return (
    <>
      <PageHeader
        title="Logs"
        description="Registro de atividades do workspace — chaves, modelos, usuários, orçamento e provedores."
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
            placeholder="Buscar por evento, detalhe…"
            className="pl-8"
            aria-label="Buscar atividades"
          />
        </div>
        <Segmented
          label="Filtrar por tipo"
          value={kindFilter}
          onChange={(value) => {
            setKindFilter(value)
            setPage(1)
          }}
          options={[
            { value: 'all', label: 'Tudo' },
            { value: 'key', label: 'Chaves' },
            { value: 'model', label: 'Modelos' },
            { value: 'user', label: 'Usuários' },
            { value: 'budget', label: 'Orçamento' },
            { value: 'provider', label: 'Provedores' },
          ]}
        />
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setQuery('')
              setKindFilter('all')
              setPage(1)
            }}
            className="font-mono text-[10px] uppercase tracking-wide"
          >
            <X className="size-3" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 font-mono text-[10px] leading-none">
        <span className="uppercase tracking-[0.12em] text-subtle-foreground">Eventos</span>
        <span className="tabular-nums text-foreground">{filtered.length}</span>
      </div>

      <Table className="border-border/35 bg-muted/20">
        <THead>
          <tr>
            <TH>Evento</TH>
            <TH className="hidden md:table-cell">Detalhes</TH>
            <TH>Categoria</TH>
            <TH className="text-right">Data/hora</TH>
          </tr>
        </THead>
        <TBody>
          {pageItems.map((item) => (
            <TR key={item.id}>
              <TD>
                <div className="flex items-center gap-3">
                  <span className="size-1 shrink-0 rounded-full bg-term-success" aria-hidden="true" />
                  <span>{item.text}</span>
                </div>
              </TD>
              <TD className="hidden max-w-md truncate text-[11px] text-subtle-foreground md:table-cell">
                {item.detail}
              </TD>
              <TD>
                <StatusBadge tone="muted" dot={false}>{kindLabels[item.kind]}</StatusBadge>
              </TD>
              <TD className="text-right">
                <time
                  dateTime={item.occurredAt}
                  className="font-mono text-[11px] tabular-nums text-subtle-foreground"
                  title={item.time}
                >
                  {item.occurredAt}
                </time>
              </TD>
            </TR>
          ))}
          {pageItems.length === 0 && (
            <TR>
              <TD colSpan={4} className="py-10 text-center text-[12px] text-muted-foreground">
                Nenhuma atividade encontrada para os filtros atuais.
              </TD>
            </TR>
          )}
        </TBody>
      </Table>

      {filtered.length > 0 && (
        <footer className="flex items-center justify-between px-1 py-1">
          <span className="font-mono text-[10px] tabular-nums text-subtle-foreground">
            {firstItem}–{lastItem} de {filtered.length} eventos
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="xs" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
              Anterior
            </Button>
            <span className="min-w-12 text-center font-mono text-[10px] tabular-nums text-subtle-foreground">
              {currentPage}/{pageCount}
            </span>
            <Button variant="outline" size="xs" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>
              Próxima
            </Button>
          </div>
        </footer>
      )}
    </>
  )
}
