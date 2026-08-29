'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/painel/page-header'
import { Field, NativeSelect, SettingRow, TextInput, Toggle } from '@/components/painel/ui/controls'
import { Dialog } from '@/components/painel/ui/dialog'
import { fmtCurrency } from '@/lib/painel/format'
import { resetPainelStorage, usePainel } from '@/lib/painel/store'

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
        <h2 className="text-[15px] font-medium tracking-tight text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </section>
  )
}

export default function SettingsPage() {
  const { state, dispatch } = usePainel()
  const s = state.settings
  const [resetOpen, setResetOpen] = useState(false)

  const update = (patch: Partial<typeof s>) => dispatch({ type: 'update_settings', settings: patch })

  const stats = [
    { label: 'Ambiente', value: s.defaultEnvironment === 'prod' ? 'Produção' : 'Staging' },
    { label: 'Limite mensal', value: fmtCurrency(s.monthlyLimit) },
    { label: 'Retenção', value: s.retentionDays === 365 ? '1 ano' : `${s.retentionDays} dias` },
    { label: 'Webhook', value: s.webhookEnabled ? 'Ativo' : 'Inativo' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Configurações"
        description="Preferências do workspace, roteamento, notificações e governança de dados."
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] leading-none">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className="uppercase tracking-[0.12em] text-subtle-foreground">{stat.label}</span>
            <span className="tabular-nums text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Section title="Workspace" description="Identidade e ambiente padrão do workspace.">
            <div className="flex flex-col gap-4 pt-2">
              <Field label="Nome do workspace">
                <TextInput value={s.workspaceName} onChange={(e) => update({ workspaceName: e.target.value })} />
              </Field>
              <Field label="Ambiente padrão" hint="Usado como padrão ao criar novas chaves de API.">
                <NativeSelect
                  value={s.defaultEnvironment}
                  onChange={(e) => update({ defaultEnvironment: e.target.value as 'prod' | 'staging' })}
                >
                  <option value="prod">Produção</option>
                  <option value="staging">Staging</option>
                </NativeSelect>
              </Field>
              <Field
                label="Limite mensal (US$)"
                hint={`Gasto atual estimado: ${fmtCurrency(5670.57)} de ${fmtCurrency(s.monthlyLimit)}.`}
              >
                <TextInput
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={s.monthlyLimit}
                  onChange={(e) => update({ monthlyLimit: Math.max(0, Number(e.target.value) || 0) })}
                />
              </Field>
            </div>
          </Section>

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

          <Section title="Webhooks" description="Eventos de uso e incidentes enviados ao seu endpoint.">
            <div className="divide-y divide-border/35">
              <SettingRow title="Webhook ativo" description="Envia eventos em tempo real para a URL configurada.">
                <Toggle checked={s.webhookEnabled} onChange={(v) => update({ webhookEnabled: v })} label="Webhook ativo" />
              </SettingRow>
              <div className="pt-3.5">
                <Field label="URL do webhook">
                  <TextInput
                    value={s.webhookUrl}
                    disabled={!s.webhookEnabled}
                    onChange={(e) => update({ webhookUrl: e.target.value })}
                    className="font-mono text-[12px] disabled:opacity-50"
                  />
                </Field>
              </div>
            </div>
          </Section>
        </div>

        <div className="flex flex-col gap-4">
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

          <Section title="Dados e segurança" description="Retenção de logs e proteção de dados sensíveis.">
            <div className="divide-y divide-border/35">
              <div className="pb-3.5 pt-2">
                <Field label="Retenção de logs" hint="Logs de requisição são removidos automaticamente após o período.">
                  <NativeSelect
                    value={String(s.retentionDays)}
                    onChange={(e) => update({ retentionDays: Number(e.target.value) })}
                  >
                    <option value="7">7 dias</option>
                    <option value="30">30 dias</option>
                    <option value="90">90 dias</option>
                    <option value="365">1 ano</option>
                  </NativeSelect>
                </Field>
              </div>
              <SettingRow title="Redação de PII" description="Mascara dados pessoais identificáveis nos logs armazenados.">
                <Toggle checked={s.piiRedaction} onChange={(v) => update({ piiRedaction: v })} label="Redação de PII" />
              </SettingRow>
            </div>
          </Section>

          <section className="border border-destructive/35 bg-muted/20" aria-label="Zona de perigo">
            <div className="px-4 pb-1 pt-4">
              <h2 className="text-[15px] font-medium tracking-tight text-destructive">Zona de perigo</h2>
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
