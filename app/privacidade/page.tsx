import type { Metadata } from 'next'
import Link from 'next/link'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import { CONSENT_CATEGORIES, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Aviso de privacidade e cookies | Nylla',
  description:
    'Como a Nylla trata dados pessoais e usa cookies, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).',
}

const rights = [
  'Confirmação da existência de tratamento e acesso aos dados',
  'Correção de dados incompletos, inexatos ou desatualizados',
  'Anonimização, bloqueio ou eliminação de dados desnecessários',
  'Portabilidade a outro fornecedor, mediante requisição',
  'Eliminação dos dados tratados com base no consentimento',
  'Informação sobre compartilhamento e sobre a possibilidade de negar consentimento',
  'Revogação do consentimento a qualquer momento',
]

export default function PrivacyPage() {
  return (
    <main className="site-background min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-4 py-20 md:px-9 md:py-28">
        <p className="type-micro text-subtle-foreground">LGPD · Lei 13.709/2018</p>
        <h1 className="type-title mt-4 text-foreground">Privacidade e cookies</h1>
        <p className="type-lead mt-5 text-muted-foreground">
          Este aviso descreve quais dados a Nylla trata, com qual finalidade e como você
          controla o uso de cookies. Versão do aviso de consentimento:{' '}
          <span className="font-mono">{CONSENT_VERSION}</span>.
        </p>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="type-heading text-foreground">Controlador e contato</h2>
          <p className="type-body mt-3 text-muted-foreground">
            A Nylla é a controladora dos dados coletados neste site. Pedidos relativos aos
            seus direitos podem ser enviados ao encarregado (DPO) pelo e-mail{' '}
            <a
              href="mailto:privacidade@nylla.dev"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
            >
              privacidade@nylla.dev
            </a>
            .
          </p>
        </section>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="type-heading text-foreground">Categorias de cookies</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {CONSENT_CATEGORIES.map((category) => (
              <div key={category.id} className="py-4">
                <dt className="type-label text-foreground">
                  {category.label}
                  <span className="type-micro ml-2 text-subtle-foreground">
                    {category.required
                      ? 'base legal: legítimo interesse / execução do serviço'
                      : 'base legal: consentimento'}
                  </span>
                </dt>
                <dd className="type-caption mt-1 text-muted-foreground">
                  {category.description}
                </dd>
              </div>
            ))}
          </dl>
          <p className="type-caption mt-4 text-subtle-foreground">
            Nenhum cookie de análise ou marketing é gravado antes do seu consentimento. O
            registro da sua escolha guarda apenas a versão do aviso, a data/hora e as
            categorias aceitas, e é renovado a cada {CONSENT_MAX_AGE_DAYS} dias.
          </p>
        </section>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="type-heading text-foreground">Seus direitos</h2>
          <ul className="mt-5 space-y-2.5">
            {rights.map((right) => (
              <li key={right} className="type-body flex gap-3 text-muted-foreground">
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 flex-none bg-primary" />
                {right}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="type-heading text-foreground">Alterar ou revogar</h2>
          <p className="type-body mt-3 text-muted-foreground">
            Suas escolhas podem ser revistas a qualquer momento, sem prejuízo ao uso do site.
            O sinal Global Privacy Control enviado pelo navegador é respeitado
            automaticamente como recusa.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CookiePreferencesButton className="type-label h-9 border border-primary/70 bg-primary/15 px-4 text-primary transition-colors hover:bg-primary/25" />
            <Link
              href="/"
              className="type-label h-9 border border-border px-4 leading-9 text-foreground transition-colors hover:bg-secondary"
            >
              Voltar ao início
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
