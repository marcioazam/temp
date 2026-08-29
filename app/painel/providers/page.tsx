'use client'

import { useState } from 'react'
import { Pause, Play, Plus, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import { fmtCurrency, fmtLatency, fmtPercent } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Dialog } from '@/components/painel/ui/dialog'
import { Field, NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

const tone = { operational: 'success', degraded: 'warning', paused: 'muted' } as const
const label = { operational: 'Operacional', degraded: 'Degradado', paused: 'Pausado' } as const

export default function ProvidersPage() {
  const { state, dispatch } = usePainel()
  const [connectOpen, setConnectOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [syncing, setSyncing] = useState<string | null>(null)

  function sync(id: string) {
    setSyncing(id)
    window.setTimeout(() => setSyncing(null), 900)
  }

  return (
    <>
      <PageHeader
        title="Provedores"
        description="Conecte provedores de LLM e acompanhe latência, taxa de erro e custo de cada um em tempo real."
        actions={
          <Button size="sm" onClick={() => { setConnected(false); setConnectOpen(true) }}>
            <Plus className="size-3.5" />
            Conectar provedor
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {state.providers.map((p) => (
          <section key={p.id} className="flex flex-col border border-border bg-card" aria-label={p.name}>
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center border border-border bg-muted font-mono text-[10px] uppercase text-muted-foreground">
                  {p.name.slice(0, 2)}
                </span>
                <span className="text-[13px] text-foreground">{p.name}</span>
              </div>
              <StatusBadge tone={tone[p.status]}>{label[p.status]}</StatusBadge>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {[
                { label: 'Latência', value: p.status === 'paused' ? '—' : fmtLatency(p.latencyMs) },
                {
                  label: 'Erro',
                  value: p.status === 'paused' ? '—' : fmtPercent(p.errorRate, 2),
                  danger: p.errorRate > 1,
                },
                { label: 'Custo/mês', value: fmtCurrency(p.monthCost) },
                { label: 'Modelos', value: String(p.modelsCount) },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 bg-card px-4 py-2.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">{item.label}</dt>
                  <dd className={cn('font-mono text-[12px] tabular-nums', item.danger ? 'text-destructive' : 'text-muted-foreground')}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 bg-muted" aria-hidden="true">
                  <div className="h-full bg-primary/70" style={{ width: `${p.trafficPct}%` }} />
                </div>
                <span className="font-mono text-[10px] tabular-nums text-subtle-foreground">
                  {fmtPercent(p.trafficPct, 0)} do tráfego
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => sync(p.id)}
                  disabled={syncing === p.id || p.status === 'paused'}
                  aria-label={`Sincronizar ${p.name}`}
                  title="Sincronizar catálogo"
                >
                  <RefreshCw className={cn(syncing === p.id && 'animate-spin')} />
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => dispatch({ type: 'toggle_provider', id: p.id })}
                >
                  {p.status === 'paused' ? (
                    <>
                      <Play className="size-3" /> Reativar
                    </>
                  ) : (
                    <>
                      <Pause className="size-3" /> Pausar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Dialog
        open={connectOpen}
        onOpenChange={setConnectOpen}
        title={connected ? 'Provedor conectado' : 'Conectar provedor'}
        description={
          connected
            ? 'A credencial foi validada. Os modelos serão sincronizados em instantes.'
            : 'A credencial é armazenada com criptografia e nunca é exposta às aplicações.'
        }
      >
        {connected ? (
          <div className="flex flex-col gap-4 p-5">
            <p className="border border-term-success/30 bg-term-success/5 px-3 py-2.5 text-[13px] text-term-success">
              Conexão validada com sucesso (demonstração).
            </p>
            <Button size="sm" className="self-end" onClick={() => setConnectOpen(false)}>
              Concluir
            </Button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4 p-5"
            onSubmit={(e) => {
              e.preventDefault()
              setConnected(true)
            }}
          >
            <Field label="Provedor">
              <NativeSelect defaultValue="together">
                <option value="together">Together AI</option>
                <option value="fireworks">Fireworks</option>
                <option value="deepinfra">DeepInfra</option>
                <option value="perplexity">Perplexity</option>
              </NativeSelect>
            </Field>
            <Field label="Chave de API do provedor" hint="Somente demonstração — nenhum dado é enviado.">
              <TextInput type="password" placeholder="sk-…" required autoComplete="off" />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" type="button" onClick={() => setConnectOpen(false)}>
                Cancelar
              </Button>
              <Button size="sm" type="submit">
                Validar e conectar
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  )
}
