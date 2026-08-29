'use client'

import { useState } from 'react'
import { Check, Copy, Plus, RotateCcw, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePainel } from '@/lib/painel/store'
import type { ApiKey, KeyEnvironment } from '@/lib/painel/data'
import { randomKeySuffix } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Dialog } from '@/components/painel/ui/dialog'
import { Field, NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

export default function ApiKeysPage() {
  const { state, dispatch } = usePainel()
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEnv, setNewEnv] = useState<KeyEnvironment>('prod')
  const [newScope, setNewScope] = useState('Completo')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [confirmRevoke, setConfirmRevoke] = useState<ApiKey | null>(null)

  const activeKeys = state.keys.filter((k) => !k.revoked)
  const revokedKeys = state.keys.filter((k) => k.revoked)

  function createKey() {
    if (!newName.trim()) return
    const suffix = randomKeySuffix()
    const envPrefix = newEnv === 'prod' ? 'nyl_live' : 'nyl_test'
    const full = `${envPrefix}_${suffix}`
    dispatch({
      type: 'create_key',
      key: {
        id: `k_${Date.now()}`,
        name: newName.trim(),
        prefix: `${envPrefix}_${suffix.slice(0, 4)}`,
        environment: newEnv,
        scope: newScope,
        lastUsed: '—',
        createdBy: 'Ana Ribeiro',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        revoked: false,
      },
    })
    setCreatedKey(full)
  }

  async function copyKey() {
    if (!createdKey) return
    try {
      await navigator.clipboard.writeText(createdKey)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard indisponível
    }
  }

  function closeCreate() {
    setCreateOpen(false)
    setCreatedKey(null)
    setNewName('')
    setNewEnv('prod')
    setNewScope('Completo')
  }

  function rotate(key: ApiKey) {
    const envPrefix = key.environment === 'prod' ? 'nyl_live' : 'nyl_test'
    dispatch({ type: 'rotate_key', id: key.id, prefix: `${envPrefix}_${randomKeySuffix().slice(0, 4)}` })
  }

  return (
    <>
      <PageHeader
        title="Chaves de API"
        description="Crie e gerencie credenciais para acessar o gateway. A chave completa só é exibida uma vez, na criação."
        actions={
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="size-3.5" />
            Criar chave
          </Button>
        }
      />

      <Table>
        <THead>
          <tr>
            <TH>Nome</TH>
            <TH>Chave</TH>
            <TH>Ambiente</TH>
            <TH>Escopo</TH>
            <TH className="hidden md:table-cell">Último uso</TH>
            <TH className="hidden lg:table-cell">Criada por</TH>
            <TH className="text-right">Ações</TH>
          </tr>
        </THead>
        <TBody>
          {activeKeys.map((key) => (
            <TR key={key.id}>
              <TD>{key.name}</TD>
              <TD>
                <span className="font-mono text-[12px] text-muted-foreground" data-no-translate>
                  {key.prefix}
                  {'••••••••'}
                </span>
              </TD>
              <TD>
                <StatusBadge tone={key.environment === 'prod' ? 'primary' : 'muted'} dot={false}>
                  {key.environment === 'prod' ? 'Prod' : 'Staging'}
                </StatusBadge>
              </TD>
              <TD className="text-muted-foreground">{key.scope}</TD>
              <TD className="hidden font-mono text-[12px] text-subtle-foreground md:table-cell">{key.lastUsed}</TD>
              <TD className="hidden text-muted-foreground lg:table-cell">{key.createdBy}</TD>
              <TD>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon-xs" onClick={() => rotate(key)} aria-label={`Rotacionar chave ${key.name}`} title="Rotacionar">
                    <RotateCcw />
                  </Button>
                  <Button variant="destructive" size="xs" onClick={() => setConfirmRevoke(key)}>
                    Revogar
                  </Button>
                </div>
              </TD>
            </TR>
          ))}
          {activeKeys.length === 0 && (
            <TR>
              <TD className="py-10 text-center text-subtle-foreground" colSpan={7}>
                Nenhuma chave ativa. Crie a primeira chave para começar.
              </TD>
            </TR>
          )}
        </TBody>
      </Table>

      {revokedKeys.length > 0 && (
        <section aria-label="Chaves revogadas" className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle-foreground">Revogadas</p>
          <Table>
            <TBody>
              {revokedKeys.map((key) => (
                <TR key={key.id} className="opacity-60">
                  <TD>{key.name}</TD>
                  <TD>
                    <span className="font-mono text-[12px] text-subtle-foreground line-through" data-no-translate>
                      {key.prefix}
                      {'••••••••'}
                    </span>
                  </TD>
                  <TD className="hidden md:table-cell">
                    <StatusBadge tone="danger" dot={false}>Revogada</StatusBadge>
                  </TD>
                  <TD className="hidden text-right font-mono text-[11px] text-subtle-foreground lg:table-cell">
                    criada em {key.createdAt}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </section>
      )}

      <Dialog
        open={createOpen}
        onOpenChange={(o) => {
          if (!o) closeCreate()
        }}
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
              <Button variant="outline" size="icon-sm" onClick={copyKey} aria-label="Copiar chave">
                {copied ? <Check className="text-term-success" /> : <Copy />}
              </Button>
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <Field label="Ambiente">
                <NativeSelect value={newEnv} onChange={(e) => setNewEnv(e.target.value as KeyEnvironment)}>
                  <option value="prod">Produção</option>
                  <option value="staging">Staging</option>
                </NativeSelect>
              </Field>
              <Field label="Escopo">
                <NativeSelect value={newScope} onChange={(e) => setNewScope(e.target.value)}>
                  <option>Completo</option>
                  <option>Somente inferência</option>
                  <option>Somente leitura</option>
                </NativeSelect>
              </Field>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" type="button" onClick={closeCreate}>
                Cancelar
              </Button>
              <Button size="sm" type="submit" disabled={!newName.trim()}>
                Criar chave
              </Button>
            </div>
          </form>
        )}
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
