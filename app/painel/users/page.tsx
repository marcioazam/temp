'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { usePainel } from '@/lib/painel/store'
import type { Member, MemberRole } from '@/lib/painel/data'
import { fmtCurrency, initials } from '@/lib/painel/format'
import { PageHeader } from '@/components/painel/page-header'
import { StatusBadge } from '@/components/painel/ui/badge'
import { Table, TBody, TD, TH, THead, TR } from '@/components/painel/ui/data-table'
import { Dialog } from '@/components/painel/ui/dialog'
import { Field, NativeSelect, TextInput } from '@/components/painel/ui/controls'
import { Button } from '@/components/ui/button'

const roles: MemberRole[] = ['Owner', 'Admin', 'Developer', 'Viewer']

export default function UsersPage() {
  const { state, dispatch } = usePainel()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<MemberRole>('Developer')
  const [confirmRemove, setConfirmRemove] = useState<Member | null>(null)

  function invite() {
    const email = inviteEmail.trim().toLowerCase()
    if (!email || !email.includes('@')) return
    const name = email
      .split('@')[0]
      .split(/[._-]/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
    dispatch({
      type: 'invite_member',
      member: {
        id: `u_${Date.now()}`,
        name,
        email,
        role: inviteRole,
        status: 'invited',
        spend: 0,
        lastAccess: '—',
      },
    })
    setInviteOpen(false)
    setInviteEmail('')
    setInviteRole('Developer')
  }

  return (
    <>
      <PageHeader
        title="Usuários"
        description="Gerencie os membros do workspace, seus papéis e o consumo individual."
        actions={
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <Plus className="size-3.5" />
            Convidar usuário
          </Button>
        }
      />

      <Table>
        <THead>
          <tr>
            <TH>Membro</TH>
            <TH>Papel</TH>
            <TH>Status</TH>
            <TH className="hidden md:table-cell">Consumo no mês</TH>
            <TH className="hidden lg:table-cell">Último acesso</TH>
            <TH className="text-right">Ações</TH>
          </tr>
        </THead>
        <TBody>
          {state.members.map((member) => {
            const isOwner = member.role === 'Owner'
            return (
              <TR key={member.id}>
                <TD>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center border border-border bg-muted font-mono text-[10px] text-muted-foreground">
                      {initials(member.name)}
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-[13px] text-foreground">{member.name}</span>
                      <span className="truncate text-[11px] text-subtle-foreground">{member.email}</span>
                    </div>
                  </div>
                </TD>
                <TD>
                  {isOwner ? (
                    <StatusBadge tone="primary" dot={false}>Owner</StatusBadge>
                  ) : (
                    <NativeSelect
                      value={member.role}
                      onChange={(e) =>
                        dispatch({ type: 'set_member_role', id: member.id, role: e.target.value as MemberRole })
                      }
                      className="h-7 w-auto min-w-28 text-[12px]"
                      aria-label={`Papel de ${member.name}`}
                    >
                      {roles
                        .filter((r) => r !== 'Owner')
                        .map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                    </NativeSelect>
                  )}
                </TD>
                <TD>
                  <StatusBadge tone={member.status === 'active' ? 'success' : 'warning'}>
                    {member.status === 'active' ? 'Ativo' : 'Convidado'}
                  </StatusBadge>
                </TD>
                <TD className="hidden font-mono text-[12px] tabular-nums text-muted-foreground md:table-cell">
                  {member.spend > 0 ? fmtCurrency(member.spend) : '—'}
                </TD>
                <TD className="hidden font-mono text-[11px] text-subtle-foreground lg:table-cell">{member.lastAccess}</TD>
                <TD>
                  <div className="flex justify-end">
                    {!isOwner && (
                      <Button variant="destructive" size="xs" onClick={() => setConfirmRemove(member)}>
                        Remover
                      </Button>
                    )}
                  </div>
                </TD>
              </TR>
            )
          })}
        </TBody>
      </Table>

      <Dialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title="Convidar usuário"
        description="O convite é enviado por e-mail e expira em 7 dias."
      >
        <form
          className="flex flex-col gap-4 p-5"
          onSubmit={(e) => {
            e.preventDefault()
            invite()
          }}
        >
          <Field label="E-mail">
            <TextInput
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="pessoa@empresa.com"
              autoFocus
              required
            />
          </Field>
          <Field label="Papel" hint="Developer pode criar chaves e usar o playground; Viewer apenas visualiza.">
            <NativeSelect value={inviteRole} onChange={(e) => setInviteRole(e.target.value as MemberRole)}>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Viewer">Viewer</option>
            </NativeSelect>
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" type="button" onClick={() => setInviteOpen(false)}>
              Cancelar
            </Button>
            <Button size="sm" type="submit" disabled={!inviteEmail.includes('@')}>
              Enviar convite
            </Button>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={confirmRemove !== null}
        onOpenChange={(o) => {
          if (!o) setConfirmRemove(null)
        }}
        title="Remover usuário"
        description="O acesso ao workspace é revogado imediatamente."
      >
        <div className="flex flex-col gap-4 p-5">
          {confirmRemove && (
            <p className="border border-border bg-background px-3 py-2 text-[13px] text-foreground">
              {confirmRemove.name} <span className="text-subtle-foreground">({confirmRemove.email})</span>
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setConfirmRemove(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirmRemove) dispatch({ type: 'remove_member', id: confirmRemove.id })
                setConfirmRemove(null)
              }}
            >
              Remover
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
