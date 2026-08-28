import type { Metadata } from 'next'
import Link from 'next/link'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import {
  CONSENT_CATEGORIES,
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Política de cookies | Nylla',
  description:
    'Inventário completo dos cookies e do armazenamento local usados pela Nylla, com finalidade, categoria, duração e como retirar seu consentimento.',
}

const LAST_UPDATED = '27 de agosto de 2026'

const linkClass =
  'text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary'

/** Inventário auditado no código : ver docs/spec-politica-de-cookies.md. */
const INVENTORY: Array<{
  name: string
  kind: string
  purpose: string
  category: string
  duration: string
  party: string
}> = [
  {
    name: CONSENT_COOKIE_NAME,
    kind: 'Cookie',
    purpose:
      'Guarda sua escolha de cookies e a prova do consentimento: versão do aviso, data e hora, método e categorias aceitas.',
    category: 'Necessários',
    duration: `${CONSENT_MAX_AGE_DAYS} dias`,
    party: 'Primária',
  },
  {
    name: CONSENT_STORAGE_KEY,
    kind: 'localStorage',
    purpose:
      'Cópia do mesmo registro de consentimento, para que sua escolha sobreviva à expiração do cookie no mesmo navegador.',
    category: 'Necessários',
    duration: 'Até você limpar os dados do site',
    party: 'Primária',
  },
  {
    name: 'nylla-language',
    kind: 'localStorage',
    purpose: 'Lembra se você escolheu português ou inglês, para não reverter a cada visita.',
    category: 'Necessários',
    duration: 'Até você limpar os dados do site',
    party: 'Primária',
  },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="type-label text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-pretty text-muted-foreground">{children}</p>
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <dt className="type-caption text-foreground sm:w-64 sm:flex-none">{term}</dt>
      <dd className="type-caption text-muted-foreground">{children}</dd>
    </div>
  )
}

/** Entrada do inventário: cobre os seis campos exigidos sem o peso de uma tabela. */
function Entry({
  name,
  kind,
  purpose,
  category,
  duration,
  party,
}: (typeof INVENTORY)[number]) {
  return (
    <div className="flex flex-col gap-1">
      <p className="type-caption font-mono text-foreground">{name}</p>
      <p className="type-caption text-pretty text-muted-foreground">{purpose}</p>
      <p className="type-micro text-subtle-foreground">
        {kind} · {party} · {category} · {duration}
      </p>
    </div>
  )
}

export default function CookiePolicyPage() {
  return (
    <main className="site-background">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="type-heading text-foreground">Política de cookies</h1>
          <p className="type-micro mt-3 text-subtle-foreground">
            Versão {CONSENT_VERSION} · Atualizado em {LAST_UPDATED}
          </p>
          <p className="type-caption mt-6 text-pretty text-muted-foreground">
            Esta página lista, sem exceção, todo cookie e todo armazenamento local que a Nylla
            grava no seu navegador. As categorias abaixo são exatamente as do banner de
            consentimento. Sua escolha vale por {CONSENT_MAX_AGE_DAYS} dias e pode ser mudada
            quando quiser.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <Section title="O que são cookies">
              <P>
                Cookies são pequenos arquivos gravados pelo navegador para lembrar informações
                entre páginas e visitas. Tecnologias similares, como o armazenamento local
                (localStorage), cumprem a mesma função e recebem aqui o mesmo tratamento. Por
                isso aparecem no inventário, e não em nota de rodapé.
              </P>
            </Section>

            <Section title="Como pedimos seu consentimento">
              <P>
                Nada além do estritamente necessário roda antes da sua escolha. Nenhuma caixa vem
                pré-marcada, recusar tem o mesmo peso visual que aceitar, e não há muro de
                cookies: o site funciona igual se você recusar tudo. Se o seu navegador enviar o
                sinal Global Privacy Control, tratamos como recusa e não interrompemos sua
                leitura.
              </P>
              <P>
                Guardamos apenas a prova exigida pelo art. 8º, §1º da LGPD: versão do aviso,
                data e hora, método e categorias aceitas. O aviso é reapresentado quando a versão
                muda ou quando o prazo de {CONSENT_MAX_AGE_DAYS} dias expira.
              </P>
            </Section>

            <Section title="Categorias">
              <dl className="flex flex-col gap-3">
                {CONSENT_CATEGORIES.map((category) => (
                  <Row key={category.id} term={category.label}>
                    {category.description}{' '}
                    <span className="text-subtle-foreground">
                      {category.required
                        ? 'Sempre ativo, por legítimo interesse na operação do site.'
                        : 'Só roda com o seu consentimento.'}
                    </span>
                  </Row>
                ))}
              </dl>
            </Section>

            <Section title="Inventário completo">
              <div className="flex flex-col gap-6">
                {INVENTORY.map((item) => (
                  <Entry key={item.name} {...item} />
                ))}
              </div>
            </Section>

            <Section title="Análise: sem cookies">
              <P>
                Nossa plataforma de análise não grava cookie nem qualquer identificador no seu
                dispositivo. Ela conta visitas por meio de um valor derivado da própria
                requisição, renovado todos os dias. Mesmo assim, ela só é carregada se você
                aceitar a categoria Análise, porque ainda há processamento de dado
                potencialmente pessoal, e a escolha é sua.
              </P>
            </Section>

            <Section title="Marketing: nada ativo">
              <P>
                Hoje não usamos nenhum cookie ou pixel de marketing, publicidade ou rede social.
                A categoria existe no banner para o caso de passarmos a usar. Se isso acontecer,
                a entrada correspondente será publicada aqui antes de qualquer script entrar no
                ar, e o consentimento será pedido de novo.
              </P>
            </Section>

            <Section title="Base legal">
              <dl className="flex flex-col gap-3">
                <Row term="Necessários">
                  Legítimo interesse e execução do serviço (art. 7º, incisos V e IX da LGPD).
                </Row>
                <Row term="Análise">Consentimento (art. 7º, inciso I).</Row>
                <Row term="Marketing">Consentimento (art. 7º, inciso I).</Row>
              </dl>
            </Section>

            <Section title="Como mudar ou retirar seu consentimento">
              <P>
                Você pode reabrir o painel de preferências a qualquer momento, no rodapé de
                qualquer página ou pelo botão abaixo. A retirada é gratuita e imediata, e vale
                tanto para o futuro quanto para o que já estava ativo.
              </P>
              <CookiePreferencesButton className={`${linkClass} type-caption self-start`} />
              <P>
                Também é possível bloquear ou apagar cookies nas configurações do seu navegador.
                Nesse caso, apagar o nosso registro de consentimento faz o aviso reaparecer na
                próxima visita.
              </P>
            </Section>

            <Section title="Terceiros e transferência internacional">
              <P>
                Nenhum terceiro grava cookies neste site. A plataforma de análise, quando
                autorizada, processa dados nos Estados Unidos, com as cláusulas-padrão
                contratuais da Resolução CD/ANPD nº 19/2024. O detalhamento de compartilhamento
                está no{' '}
                <Link href="/privacidade" className={linkClass}>
                  aviso de privacidade
                </Link>
                .
              </P>
            </Section>

            <Section title="Alterações">
              <P>
                Quando esta política mudar de forma relevante, a versão é incrementada e o aviso
                de consentimento reaparece para você decidir de novo. Mudanças de redação sem
                impacto no tratamento apenas atualizam a data no topo desta página.
              </P>
            </Section>

            <Section title="Contato">
              <P>
                Dúvidas sobre cookies ou pedidos relativos aos seus dados:{' '}
                <a href="mailto:privacidade@nylla.dev" className={linkClass}>
                  privacidade@nylla.dev
                </a>
                . Seus direitos como titular e os prazos de resposta estão descritos no{' '}
                <Link href="/privacidade" className={linkClass}>
                  aviso de privacidade
                </Link>
                .
              </P>
            </Section>
          </div>

          <Link
            href="/"
            className="type-micro mt-14 inline-flex items-center whitespace-nowrap border border-foreground/45 bg-background px-3.5 py-2 text-foreground transition-colors hover:border-foreground hover:bg-background"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  )
}
