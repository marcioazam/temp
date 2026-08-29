'use client'

import { useMemo, useState } from 'react'
import { Check, Copy, Plus, RotateCcw, Search, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { ApiKey, KeyEnvironment } from '@/lib/painel/data'
import { fmtCompact, randomKeySuffix } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Dialog } from '@/components/painel/ui/dialog'
import { Field, TextInput } from '@/components/painel/ui/controls'
import { Segmented } from '@/components/painel/ui/segmented'
import { Button } from '@/components/ui/button'

type EnvFilter = 'all' | KeyEnvironment
type Expiry = 'never' | '30d' | '90d' | '1y'

const scopeOptions = [
  { value: 'Completo', description: 'Leitura, inferência e gerenciamento de recursos.' },
  { value: 'Somente inferência', description: 'Executa modelos, sem acesso administrativo.' },
  { value: 'Somente leitura', description: 'Consulta métricas e configurações, sem executar.' },
] as const

const expiryLabel: Record<Expiry, string> = {
  never: 'Nunca',
  '30d': '30 dias',
  '90d': '90 dias',
  '1y': '1 ano',
}

function expiryDate(expiry: Expiry): string {
  if (expiry === 'never') return 'Nunca'
  const days = expiry === '30d' ? 30 : expiry === '90d' ? 90 : 365
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('pt-BR')
}

function CopyPrefixButton({ prefix, name }: { prefix: string; name: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={`Copiar prefixo da chave ${name}`}
      title="Copiar prefixo"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(prefix)
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

export default function ApiKeysPage() {
  const { state, dispatch } = usePainel()

  // Listagem
  const [query, setQuery] = useState('')
  const [envFilter, setEnvFilter] = useState<EnvFilter>('all')

  // Criação
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEnv, setNewEnv] = useState<KeyEnvironment>('prod')
  const [newScope, setNewScope] = useState<string>('Completo')
  const [newExpiry, setNewExpiry] = useState<Expiry>('never')
  const [newRateLimit, setNewRateLimit] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [createdSummary, setCreatedSummary] = useState<ApiKey | null>(null)
  const [copied, setCopied] = useState(false)

  // Rotação / revogação
  const [confirmRotate, setConfirmRotate] = useState<ApiKey | null>(null)
  const [rotatedKey, setRotatedKey] = useState<string | null>(null)
  const [rotatedCopied, setRotatedCopied] = useState(false)
  const [confirmRevoke, setConfirmRevoke] = useState<ApiKey | null>(null)

  const activeKeys = state.keys.filter((k) => !k.revoked)

  const filteredKeys = useMemo(() => {
    const q = query.trim().toLowerCase()
    return activeKeys.filter((k) => {
      if (envFilter !== 'all' && k.environment !== envFilter) return false
      if (q && !k.name.toLowerCase().includes(q) && !k.prefix.toLowerCase().includes(q)) return false
      return true
    })
  }, [activeKeys, envFilter, query])

  const prodCount = activeKeys.filter((k) => k.environment === 'prod').length
  const totalRequests30d = activeKeys.reduce((acc, k) => acc + (k.requests30d ?? 0), 0)

  const stats = [
    { label: 'Chaves ativas', value: String(activeKeys.length) },
    { label: 'Produção', value: String(prodCount) },
    { label: 'Staging', value: String(activeKeys.length - prodCount) },
    { label: 'Req. 30d', value: fmtCompact(totalRequests30d) },
  ]

  function createKey() {
    if (!newName.trim()) return
    const suffix = randomKeySuffix()
    const envPrefix = newEnv === 'prod' ? 'nyl_live' : 'nyl_test'
    const full = `${envPrefix}_${suffix}`
    const parsedLimit = Number.parseInt(newRateLimit, 10)
    const key: ApiKey = {
      id: `k_${Date.now()}`,
      name: newName.trim(),
      prefix: `${envPrefix}_${suffix.slice(0, 4)}`,
      environment: newEnv,
      scope: newScope,
      lastUsed: '—',
      createdBy: 'Ana Ribeiro',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      revoked: false,
      expiresAt: expiryDate(newExpiry),
      requests30d: 0,
      ...(Number.isFinite(parsedLimit) && parsedLimit > 0 ? { rateLimit: parsedLimit } : {}),
    }
    dispatch({ type: 'create_key', key })
    setCreatedSummary(key)
    setCreatedKey(full)
  }

  async function copyText(text: string, setFlag: (v: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text)
      setFlag(true)
      window.setTimeout(() => setFlag(false), 1600)
    } catch {
      // clipboard indisponível
    }
  }

  function closeCreate() {
    setCreateOpen(false)
    setCreatedKey(null)
    setCreatedSummary(null)
    setNewName('')
    setNewEnv('prod')
    setNewScope('Completo')
    setNewExpiry('never')
    setNewRateLimit('')
  }

  function rotate(key: ApiKey) {
    const envPrefix = key.environment === 'prod' ? 'nyl_live' : 'nyl_test'
    const suffix = randomKeySuffix()
    dispatch({ type: 'rotate_key', id: key.id, prefix: `${envPrefix}_${suffix.slice(0, 4)}` })
    setRotatedKey(`${envPrefix}_${suffix}`)
  }

  function closeRotate() {
    setConfirmRotate(null)
    setRotatedKey(null)
  }

  return (
    <>
      <PageHeader
        title="Chaves de API"
        description="Crie e gerencie credenciais para acessar o gateway. A chave completa só é exibida uma vez, na criação."
        actions={
          <Button
            size="sm"
            className="h-7 rounded-none border border-foreground bg-foreground px-3 font-mono text-[9px] font-semibold uppercase tracking-wide text-background hover:bg-foreground/90"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="size-3.5" />
            Criar chave
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] leading-none">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="uppercase tracking-[0.12em] text-subtle-foreground">{s.label}</span>
            <span className="tabular-nums text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      <section className="border border-border/35 bg-muted/20" aria-label="Chaves ativas">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-1 pt-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[15px] font-medium tracking-tight text-foreground">Chaves ativas</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
              {filteredKeys.length} de {activeKeys.length}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" aria-hidden="true" />
              <TextInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome ou prefixo"
                className="h-[30px] w-56 pl-8"
                aria-label="Buscar chaves"
              />
            </div>
            <Segmented
              label="Filtrar por ambiente"
              value={envFilter}
              onChange={setEnvFilter}
              options={[
                { value: 'all', label: 'Todas' },
                { value: 'prod', label: 'Prod' },
                { value: 'staging', label: 'Staging' },
              ]}
            />
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4 pt-3">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr>
                {['Nome', 'Chave', 'Último uso', 'Req. 30d', 'Expira', ''].map((h, i) => (
                  <th
                    key={h || 'acoes'}
                    className={cn(
                      'pb-2.5 pr-4 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-subtle-foreground',
                      i >= 3 && 'text-right',
                      i === 5 && 'pr-0',
                    )}
                  >
                    {h || <span className="sr-only">Ações</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredKeys.map((key) => (
                <tr key={key.id} className="group">
                  <td className="py-2.5 pr-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-foreground">{key.name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {key.scope}
                        {key.rateLimit ? ` · ${key.rateLimit} req/min` : ''}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[12px] text-muted-foreground" data-no-translate>
                        {key.prefix}
                        {'••••••••'}
                      </span>
                      <CopyPrefixButton prefix={key.prefix} name={key.name} />
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-[12px] text-subtle-foreground">{key.lastUsed}</td>
                  <td className="py-2.5 pr-4 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                    {key.requests30d != null ? fmtCompact(key.requests30d) : '—'}
                  </td>
                  <td className="py-2.5 pr-4 text-right font-mono text-[12px] text-subtle-foreground">
                    {key.expiresAt ?? 'Nunca'}
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => setConfirmRotate(key)}
                        aria-label={`Rotacionar chave ${key.name}`}
                        title="Rotacionar"
                      >
                        <RotateCcw />
                      </Button>
                      <Button variant="destructive" size="xs" onClick={() => setConfirmRevoke(key)}>
                        Revogar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredKeys.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <p className="text-[13px] text-muted-foreground">
                      {activeKeys.length === 0
                        ? 'Nenhuma chave ativa. Crie a primeira chave para começar.'
                        : 'Nenhuma chave corresponde à busca ou filtro atual.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog
        open={createOpen}
        onOpenChange={(o) => {
          if (!o) closeCreate()
        }}
        showHeaderBorder={false}
        title={createdKey ? 'Chave criada' : 'Criar chave de API'}
        description={
          createdKey
            ? 'Copie a chave agora. Por segurança, ela não será exibida novamente.'
            : 'A chave herda as permissões do escopo selecionado.'
        }
      >
        {createdKey ? (
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-2 border border-primary/30 bg-primary/5 p-3">
              <code className="min-w-0 flex-1 break-all font-mono text-[12px] text-foreground" data-no-translate>
                {createdKey}
              </code>
              <Button variant="outline" size="icon-sm" onClick={() => copyText(createdKey, setCopied)} aria-label="Copiar chave">
                {copied ? <Check className="text-term-success" /> : <Copy />}
              </Button>
            </div>
            {createdSummary && (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[11px] sm:grid-cols-4">
                {[
                  { dt: 'Ambiente', dd: createdSummary.environment === 'prod' ? 'Produção' : 'Staging' },
                  { dt: 'Escopo', dd: createdSummary.scope },
                  { dt: 'Expira', dd: createdSummary.expiresAt ?? 'Nunca' },
                  { dt: 'Rate limit', dd: createdSummary.rateLimit ? `${createdSummary.rateLimit} req/min` : '—' },
                ].map((row) => (
                  <div key={row.dt} className="flex flex-col gap-0.5">
                    <dt className="text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">{row.dt}</dt>
                    <dd className="text-muted-foreground">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-primary" />
              Armazene em um gerenciador de segredos. Chaves expostas devem ser rotacionadas imediatamente.
            </p>
            <Button size="sm" onClick={closeCreate} className="self-end">
              Concluir
            </Button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4 p-5"
            onSubmit={(e) => {
              e.preventDefault()
              createKey()
            }}
          >
            <Field label="Nome da chave">
              <TextInput
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex.: Produção — API principal"
                autoFocus
                required
              />
            </Field>

            <fieldset className="flex flex-col gap-1.5">
              <legend className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">
                Escopo
              </legend>
              <div className="flex flex-col gap-1.5">
                {scopeOptions.map((s) => (
                  <label
                    key={s.value}
                    className={cn(
                      'flex cursor-pointer items-start gap-2.5 border p-2.5 transition-colors',
                      newScope === s.value
                        ? 'border-foreground bg-foreground/5'
                        : 'border-border bg-background hover:border-foreground/25',
                    )}
                  >
                    <input
                      type="radio"
                      name="scope"
                      value={s.value}
                      checked={newScope === s.value}
                      onChange={() => setNewScope(s.value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'mt-1 size-1.5 shrink-0 rounded-full',
                        newScope === s.value ? 'bg-foreground' : 'bg-border',
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-foreground">{s.value}</span>
                      <span className="text-[11px] leading-relaxed text-muted-foreground">{s.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Expiração</span>
                <Segmented
                  label="Expiração da chave"
                  value={newExpiry}
                  onChange={setNewExpiry}
                  options={[
                    { value: 'never', label: 'Nunca' },
                    { value: '30d', label: '30d' },
                    { value: '90d', label: '90d' },
                    { value: '1y', label: '1 ano' },
                  ]}
                />
              </div>
              <Field label="Rate limit (req/min)" hint="Opcional. Vazio usa o limite do workspace.">
                <TextInput
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={newRateLimit}
                  onChange={(e) => setNewRateLimit(e.target.value)}
                  placeholder="Ex.: 600"
                />
              </Field>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" type="button" onClick={closeCreate}>
                Cancelar
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={!newName.trim()}
                className="h-7 rounded-none border border-foreground bg-foreground px-3 font-mono text-[9px] font-semibold uppercase tracking-wide text-background hover:bg-foreground/90"
              >
                Criar chave
              </Button>
            </div>
          </form>
        )}
      </Dialog>

      <Dialog
        open={confirmRotate !== null}
        onOpenChange={(o) => {
          if (!o) closeRotate()
        }}
        title={rotatedKey ? 'Chave rotacionada' : 'Rotacionar chave'}
        description={
          rotatedKey
            ? 'Copie a nova chave agora. A anterior foi invalidada e esta não será exibida novamente.'
            : 'A chave atual será invalidada imediatamente e uma nova será gerada. Aplicações que usam a chave atual perderão acesso.'
        }
      >
        <div className="flex flex-col gap-4 p-5">
          {rotatedKey ? (
            <>
              <div className="flex items-center gap-2 border border-primary/30 bg-primary/5 p-3">
                <code className="min-w-0 flex-1 break-all font-mono text-[12px] text-foreground" data-no-translate>
                  {rotatedKey}
                </code>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => copyText(rotatedKey, setRotatedCopied)}
                  aria-label="Copiar nova chave"
                >
                  {rotatedCopied ? <Check className="text-term-success" /> : <Copy />}
                </Button>
              </div>
              <Button size="sm" onClick={closeRotate} className="self-end">
                Concluir
              </Button>
            </>
          ) : (
            <>
              {confirmRotate && (
                <p className="border border-border bg-background px-3 py-2 text-[13px] text-foreground">
                  {confirmRotate.name}{' '}
                  <span className="font-mono text-[11px] text-subtle-foreground" data-no-translate>
                    ({confirmRotate.prefix}…)
                  </span>
                </p>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={closeRotate}>
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (confirmRotate) rotate(confirmRotate)
                  }}
                >
                  Rotacionar chave
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>

      <Dialog
        open={confirmRevoke !== null}
        onOpenChange={(o) => {
          if (!o) setConfirmRevoke(null)
        }}
        title="Revogar chave"
        description="Aplicações que usam esta chave perderão acesso imediatamente. Esta ação não pode ser desfeita."
      >
        <div className="flex flex-col gap-4 p-5">
          {confirmRevoke && (
            <p className="border border-border bg-background px-3 py-2 text-[13px] text-foreground">
              {confirmRevoke.name}{' '}
              <span className="font-mono text-[11px] text-subtle-foreground" data-no-translate>
                ({confirmRevoke.prefix}…)
              </span>
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setConfirmRevoke(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirmRevoke) dispatch({ type: 'revoke_key', id: confirmRevoke.id })
                setConfirmRevoke(null)
              }}
            >
              Revogar chave
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
