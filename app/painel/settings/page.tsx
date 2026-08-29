'use client'

import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/painel/page-header'
import { Field, NativeSelect, SettingRow, TextInput, Toggle } from '@/components/painel/ui/controls'
import { Dialog } from '@/components/painel/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { resetPainelStorage, usePainel } from '@/lib/painel/store'

const retentionOptions = [
  { value: '7', label: '7 dias' },
  { value: '30', label: '30 dias' },
  { value: '90', label: '90 dias' },
  { value: '365', label: '1 ano' },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="border border-border/35 bg-muted/20" aria-label={title}>
      <div className="px-4 pb-1 pt-4">
        <h2 className="text-base font-medium tracking-tight text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </section>
  )
}

export default function SettingsPage() {
  const { state, dispatch, hydrated } = usePainel()
  const s = state.settings
  const [resetOpen, setResetOpen] = useState(false)
  const [firstName, setFirstName] = useState(s.firstName)
  const [lastName, setLastName] = useState(s.lastName)
  const [profileMessage, setProfileMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [webhookSaved, setWebhookSaved] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    if (!hydrated) return
    setFirstName(state.settings.firstName)
    setLastName(state.settings.lastName)
  }, [hydrated, state.settings.firstName, state.settings.lastName])

  const update = (patch: Partial<typeof s>) => dispatch({ type: 'update_settings', settings: patch })

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedFirstName = firstName.trim().replace(/\s+/g, ' ')
    const normalizedLastName = lastName.trim().replace(/\s+/g, ' ')

    if (!normalizedFirstName || !normalizedLastName) {
      setProfileMessage({ type: 'error', text: 'Preencha o nome e o sobrenome.' })
      return
    }

    update({ firstName: normalizedFirstName, lastName: normalizedLastName })
    setFirstName(normalizedFirstName)
    setLastName(normalizedLastName)
    setProfileMessage({ type: 'success', text: 'Perfil atualizado.' })
  }

  const closePasswordDialog = () => {
    setPasswordOpen(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Preencha todos os campos.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('A nova senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('As novas senhas não coincidem.')
      return
    }

    closePasswordDialog()
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Configurações"
        description="Preferências do workspace, roteamento, notificações e governança de dados."
      />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Section title="Roteamento" description="Comportamento do gateway de inferência.">
            <div className="divide-y divide-border/35">
              <SettingRow
                title="Cache semântico"
                description="Reutiliza respostas para prompts semanticamente equivalentes."
              >
                <Toggle checked={s.cacheEnabled} onChange={(v) => update({ cacheEnabled: v })} label="Cache semântico" />
              </SettingRow>
            </div>
          </Section>

          <Section title="Notificações" description="Escolha o que a equipe recebe por e-mail.">
            <div className="divide-y divide-border/35">
              <SettingRow title="Alertas de orçamento" description="Notifica quando os limites configurados são atingidos.">
                <Toggle checked={s.notifyBudget} onChange={(v) => update({ notifyBudget: v })} label="Alertas de orçamento" />
              </SettingRow>
              <SettingRow
                title="Incidentes de provedores"
                description="Degradações e indisponibilidades detectadas pelo gateway."
              >
                <Toggle
                  checked={s.notifyIncidents}
                  onChange={(v) => update({ notifyIncidents: v })}
                  label="Incidentes de provedores"
                />
              </SettingRow>
              <SettingRow title="Relatório semanal" description="Resumo de uso, custo e latência toda segunda-feira.">
                <Toggle
                  checked={s.notifyWeeklyReport}
                  onChange={(v) => update({ notifyWeeklyReport: v })}
                  label="Relatório semanal"
                />
              </SettingRow>
            </div>
          </Section>

          <Section title="Webhooks" description="Eventos de uso e incidentes enviados ao seu endpoint.">
            <div className="divide-y divide-border/35">
              <SettingRow title="Webhook ativo" description="Envia eventos em tempo real para a URL configurada.">
                <Toggle checked={s.webhookEnabled} onChange={(v) => update({ webhookEnabled: v })} label="Webhook ativo" />
              </SettingRow>
            <form
              className="flex flex-col gap-3 pt-3.5"
              onSubmit={(event) => {
                event.preventDefault()
                setWebhookSaved(true)
              }}
            >
              <Field label="URL do webhook">
                <TextInput
                  value={s.webhookUrl}
                  disabled={!s.webhookEnabled}
                  onChange={(event) => {
                    update({ webhookUrl: event.target.value })
                    setWebhookSaved(false)
                  }}
                  className="font-mono text-[12px] disabled:opacity-50"
                />
              </Field>
              <div className="flex items-center justify-end gap-3">
                <p role="status" aria-live="polite" className="text-[11px] text-primary">
                  {webhookSaved ? 'Webhook salvo.' : null}
                </p>
                <button
                  type="submit"
                  disabled={!s.webhookEnabled}
                  className="h-7 shrink-0 border border-foreground bg-foreground px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-4">
          <Section title="Perfil" description="Atualize como seu nome aparece no painel.">
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nome">
                  <TextInput
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value)
                      setProfileMessage(null)
                    }}
                    autoComplete="given-name"
                    aria-invalid={profileMessage?.type === 'error'}
                    aria-describedby={profileMessage ? 'profile-message' : undefined}
                  />
                </Field>
                <Field label="Sobrenome">
                  <TextInput
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value)
                      setProfileMessage(null)
                    }}
                    autoComplete="family-name"
                    aria-invalid={profileMessage?.type === 'error'}
                    aria-describedby={profileMessage ? 'profile-message' : undefined}
                  />
                </Field>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-border/35 pt-3">
                <p
                  id="profile-message"
                  role={profileMessage?.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  className={profileMessage?.type === 'error' ? 'text-[11px] text-destructive' : 'text-[11px] text-primary'}
                >
                  {profileMessage?.text}
                </p>
                <button
                  type="submit"
                  className="ml-auto h-7 shrink-0 border border-foreground bg-foreground px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-1 focus-visible:outline-ring"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          </Section>

          <Section title="Dados e segurança" description="Retenção de logs e proteção de dados sensíveis.">
            <div className="divide-y divide-border/35">
              <SettingRow title="Senha" description="Atualize a senha usada para acessar sua conta.">
                <button
                  type="button"
                  onClick={() => setPasswordOpen(true)}
                  className="h-7 shrink-0 border border-border px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-1 focus-visible:outline-primary"
                >
                  Alterar senha
                </button>
              </SettingRow>
              <div className="pb-3.5 pt-2">
                <Field label="Retenção de logs" hint="Logs de requisição são removidos automaticamente após o período.">
                  <Select
                    items={retentionOptions}
                    value={String(s.retentionDays)}
                    onValueChange={(value) => update({ retentionDays: Number(value) })}
                  >
                    <SelectTrigger className="w-full" aria-label="Retenção de logs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start" alignItemWithTrigger={false}>
                      <SelectGroup>
                        {retentionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <SettingRow title="Redação de PII" description="Mascara dados pessoais identificáveis nos logs armazenados.">
                <Toggle checked={s.piiRedaction} onChange={(v) => update({ piiRedaction: v })} label="Redação de PII" />
              </SettingRow>
              <SettingRow
                title="Usar prompts para treinamento"
                description="Permite que a Nylla use prompts e respostas para melhorar seus modelos. Desativado por padrão."
              >
                <Toggle
                  checked={s.allowPromptTraining ?? false}
                  onChange={(v) => update({ allowPromptTraining: v })}
                  label="Usar prompts para treinamento da Nylla"
                />
              </SettingRow>
            </div>
          </Section>

          <section className="border border-destructive/35 bg-muted/20" aria-label="Zona de perigo">
            <div className="px-4 pb-1 pt-4">
              <h2 className="text-base font-medium tracking-tight text-destructive">Zona de perigo</h2>
            </div>
            <div className="flex items-center justify-between gap-6 px-4 pb-4 pt-2">
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] text-foreground">Restaurar dados de demonstração</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Descarta todas as alterações locais e restaura o estado inicial do painel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setResetOpen(true)}
                className="flex h-7 shrink-0 items-center gap-2 border border-destructive/50 px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-1 focus-visible:outline-destructive"
              >
                <RotateCcw className="size-3" />
                Restaurar
              </button>
            </div>
          </section>
        </div>
      </div>

      <Dialog
        open={passwordOpen}
        onOpenChange={(open) => {
          if (open) setPasswordOpen(true)
          else closePasswordDialog()
        }}
        title="Alterar senha"
        description="Use uma senha exclusiva com pelo menos 8 caracteres."
      >
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 px-5 py-4">
          <Field label="Senha atual">
            <TextInput
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoFocus
            />
          </Field>
          <Field label="Nova senha" hint="Mínimo de 8 caracteres.">
            <TextInput
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </Field>
          <Field label="Confirmar nova senha">
            <TextInput
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'password-error' : undefined}
            />
          </Field>
          {passwordError && (
            <p id="password-error" role="alert" className="text-[11px] text-destructive">
              {passwordError}
            </p>
          )}
          <div className="flex items-center justify-end gap-2 border-t border-border/35 pt-4">
            <button
              type="button"
              onClick={closePasswordDialog}
              className="h-7 border border-border px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-7 border border-foreground bg-foreground px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-1 focus-visible:outline-ring"
            >
              Salvar senha
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Restaurar dados de demonstração"
        description="Chaves criadas, convites, alternâncias de modelos e configurações locais serão descartados."
      >
        <div className="flex items-center justify-end gap-2 px-5 py-4">
          <button
            type="button"
            onClick={() => setResetOpen(false)}
            className="h-7 border border-border px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              resetPainelStorage()
              dispatch({ type: 'reset' })
              setResetOpen(false)
            }}
            className="h-7 border border-destructive/50 bg-destructive/10 px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-destructive transition-colors hover:bg-destructive/20"
          >
            Restaurar
          </button>
        </div>
      </Dialog>
    </div>
  )
}
