'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { Model } from '@/lib/painel/data'
import { fmtCurrency, fmtLatency, fmtPercent } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Dialog } from '@/components/painel/ui/dialog'
import { NativeSelect } from '@/components/painel/ui/controls'
import { Toggle } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

export default function ModelsPage() {
  const { state, dispatch } = usePainel()
  const [providerFilter, setProviderFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [detail, setDetail] = useState<Model | null>(null)

  const providerName = (id: string) => state.providers.find((p) => p.id === id)?.name ?? id

  const filtered = useMemo(
    () =>
      state.models.filter(
        (m) =>
          (providerFilter === 'all' || m.providerId === providerFilter) &&
          (typeFilter === 'all' || m.type === typeFilter) &&
          (statusFilter === 'all' || m.status === statusFilter),
      ),
    [state.models, providerFilter, typeFilter, statusFilter],
  )

  const allSelected = filtered.length > 0 && filtered.every((m) => selected.has(m.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(filtered.map((m) => m.id)))
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function batch(status: 'active' | 'inactive') {
    dispatch({ type: 'set_models_status', ids: [...selected], status })
    setSelected(new Set())
  }

  return (
    <>
      <PageHeader
        title="Modelos"
        description="Ative os modelos disponíveis no gateway e acompanhe preço e tráfego de cada um."
      />

      <div className="flex flex-wrap items-center gap-2">
        <NativeSelect
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="w-auto min-w-36"
          aria-label="Filtrar por provedor"
        >
          <option value="all">Todos os provedores</option>
          {state.providers
            .filter((p) => p.modelsCount > 0)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </NativeSelect>
        <NativeSelect
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-auto min-w-28"
          aria-label="Filtrar por tipo"
        >
          <option value="all">Todos os tipos</option>
          <option value="Chat">Chat</option>
          <option value="Embedding">Embedding</option>
        </NativeSelect>
        <NativeSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-auto min-w-28"
          aria-label="Filtrar por status"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </NativeSelect>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-subtle-foreground">
          {filtered.length} de {state.models.length} modelos
        </span>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center gap-3 border border-primary/30 bg-primary/5 px-3 py-2">
          <span className="font-mono text-[11px] tabular-nums text-primary">{selected.size} selecionado(s)</span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="xs" onClick={() => batch('active')}>
              Ativar selecionados
            </Button>
            <Button variant="outline" size="xs" onClick={() => batch('inactive')}>
              Desativar selecionados
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={() => setSelected(new Set())} aria-label="Limpar seleção">
              <X />
            </Button>
          </div>
        </div>
      )}

      <Table>
        <THead>
          <tr>
            <TH className="w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                aria-label="Selecionar todos os modelos"
                className="accent-[#f5a524]"
              />
            </TH>
            <TH>Modelo</TH>
            <TH className="hidden sm:table-cell">Provedor</TH>
            <TH className="hidden md:table-cell">Tipo</TH>
            <TH>Status</TH>
            <TH className="hidden lg:table-cell">Entrada /1M</TH>
            <TH className="hidden lg:table-cell">Saída /1M</TH>
            <TH className="hidden md:table-cell">Tráfego</TH>
            <TH className="text-right">Ativo</TH>
          </tr>
        </THead>
        <TBody>
          {filtered.map((model) => (
            <TR key={model.id} onClick={() => setDetail(model)}>
              <TD onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selected.has(model.id)}
                  onChange={() => toggleOne(model.id)}
                  aria-label={`Selecionar ${model.name}`}
                  className="accent-[#f5a524]"
                />
              </TD>
              <TD>
                <span className="font-mono text-[12px]" data-no-translate>{model.name}</span>
              </TD>
              <TD className="hidden text-muted-foreground sm:table-cell">{providerName(model.providerId)}</TD>
              <TD className="hidden text-muted-foreground md:table-cell">{model.type}</TD>
              <TD>
                <StatusBadge tone={model.status === 'active' ? 'success' : 'muted'}>
                  {model.status === 'active' ? 'Ativo' : 'Inativo'}
                </StatusBadge>
              </TD>
              <TD className="hidden font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {fmtCurrency(model.inputPrice)}
              </TD>
              <TD className="hidden font-mono text-[12px] tabular-nums text-muted-foreground lg:table-cell">
                {model.outputPrice > 0 ? fmtCurrency(model.outputPrice) : '—'}
              </TD>
              <TD className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-16 bg-muted">
                    <div className="h-full bg-primary/70" style={{ width: `${Math.min(100, model.trafficPct * 4)}%` }} />
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-subtle-foreground">
                    {fmtPercent(model.trafficPct, 0)}
                  </span>
                </div>
              </TD>
              <TD onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <Toggle
                    checked={model.status === 'active'}
                    onChange={() => dispatch({ type: 'toggle_model', id: model.id })}
                    label={`${model.status === 'active' ? 'Desativar' : 'Ativar'} ${model.name}`}
                  />
                </div>
              </TD>
            </TR>
          ))}
          {filtered.length === 0 && (
            <TR>
              <TD colSpan={9} className="py-10 text-center text-subtle-foreground">
                Nenhum modelo corresponde aos filtros selecionados.
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
        title={detail?.name ?? ''}
        description={detail ? `${providerName(detail.providerId)} · ${detail.type}` : undefined}
        side="right"
      >
        {detail && (
          <div className="flex flex-col gap-5 p-5">
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: 'Status', value: detail.status === 'active' ? 'Ativo' : 'Inativo' },
                { label: 'Janela de contexto', value: `${detail.contextWindow} tokens` },
                { label: 'Entrada / 1M tokens', value: fmtCurrency(detail.inputPrice) },
                { label: 'Saída / 1M tokens', value: detail.outputPrice > 0 ? fmtCurrency(detail.outputPrice) : '—' },
                { label: 'Latência média', value: fmtLatency(detail.latencyMs) },
                { label: 'Tráfego do gateway', value: fmtPercent(detail.trafficPct, 0) },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 bg-card p-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">{item.label}</span>
                  <span className="font-mono text-[13px] tabular-nums text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Identificador no gateway</p>
              <code className="border border-border bg-background px-3 py-2 font-mono text-[12px] text-muted-foreground" data-no-translate>
                nylla/{detail.id}
              </code>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-[13px] text-foreground">
                {detail.status === 'active' ? 'Modelo ativo no gateway' : 'Modelo desativado'}
              </span>
              <Button
                variant={detail.status === 'active' ? 'outline' : 'default'}
                size="sm"
                onClick={() => {
                  dispatch({ type: 'toggle_model', id: detail.id })
                  setDetail({ ...detail, status: detail.status === 'active' ? 'inactive' : 'active' })
                }}
              >
                {detail.status === 'active' ? 'Desativar' : 'Ativar'}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}
