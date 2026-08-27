import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import { CONSENT_CATEGORIES, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Aviso de privacidade | Nylla',
  description:
    'Como a Nylla trata dados pessoais, prompts e cookies, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).',
}

const LAST_UPDATED = '27 de agosto de 2026'
const CONTACT = 'privacidade@nylla.dev'

const linkClass =
  'text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary'

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

/** Linha simples rótulo → valor, sem bordas nem tabela. */
function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <dt className="type-caption text-foreground sm:w-64 sm:flex-none">{term}</dt>
      <dd className="type-caption text-muted-foreground">{children}</dd>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main className="site-background">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
          <div className="w-full max-w-2xl">
          <h1 className="type-heading text-foreground">Aviso de privacidade</h1>
          <p className="type-micro mt-3 text-subtle-foreground">
            Versão {CONSENT_VERSION} · Atualizado em {LAST_UPDATED}
          </p>
          <p className="type-caption mt-6 text-pretty text-muted-foreground">
            A Nylla é um gateway universal de IA. Este aviso explica quais dados tratamos, com
            qual finalidade e por quanto tempo, conforme a Lei 13.709/2018 (LGPD). Em resumo:
            seus prompts não são retidos nem usados para treinar modelos, e nenhum cookie
            opcional roda antes da sua escolha.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <Section title="Controlador e encarregado">
              <P>
                A Nylla é a controladora dos dados tratados neste site e no gateway. Fale com o
                encarregado de proteção de dados em{' '}
                <a href={`mailto:${CONTACT}`} className={linkClass}>
                  {CONTACT}
                </a>
                . Respondemos em até 15 dias, conforme o art. 19 da LGPD. Você também pode
                peticionar diretamente à ANPD.
              </P>
            </Section>

            <Section title="Dados que tratamos">
              <dl className="flex flex-col gap-3">
                <Row term="Conta">
                  Nome, e-mail corporativo, organização, credenciais de API e registros de
                  acesso.
                </Row>
                <Row term="Metadados de roteamento">
                  Modelo escolhido, tokens, latência, código de erro e data/hora, gerados a cada
                  requisição.
                </Row>
                <Row term="Faturamento">
                  Plano, consumo agregado e dados exigidos pela legislação tributária.
                </Row>
                <Row term="Técnicos do site">
                  IP truncado, tipo de dispositivo, páginas vistas e idioma. Os não essenciais
                  dependem de consentimento.
                </Row>
              </dl>
              <P>Não tratamos dados sensíveis.</P>
            </Section>

            <Section title="Finalidades e bases legais">
              <dl className="flex flex-col gap-3">
                <Row term="Operar o gateway e rotear requisições">
                  Execução de contrato — art. 7º, V
                </Row>
                <Row term="Faturamento e obrigações fiscais">Obrigação legal — art. 7º, II</Row>
                <Row term="Segurança, antifraude e limite de uso">
                  Legítimo interesse e obrigação legal — art. 7º, IX e II
                </Row>
                <Row term="Suporte e comunicação de serviço">
                  Execução de contrato — art. 7º, V
                </Row>
                <Row term="Métricas de uso do site">Consentimento — art. 7º, I</Row>
                <Row term="Campanhas e conteúdo personalizado">Consentimento — art. 7º, I</Row>
              </dl>
            </Section>

            <Section title="Prompts e inferência">
              <P>
                O conteúdo enviado ao gateway é seu, não matéria-prima nossa. Prompts e
                respostas trafegam cifrados e não são gravados por padrão; não usamos seu
                conteúdo para treinar, ajustar ou avaliar modelos; contratamos provedores com
                política de retenção zero quando disponível; logs de depuração só existem se a
                sua organização os ativar. Se você inserir dados pessoais de terceiros em um
                prompt, você é o controlador desse conteúdo e a Nylla, operadora.
              </P>
            </Section>

            <Section title="Cookies">
              <dl className="flex flex-col gap-3">
                {CONSENT_CATEGORIES.map((category) => (
                  <Row key={category.id} term={category.label}>
                    {category.description}{' '}
                    <span className="text-subtle-foreground">
                      {category.required ? 'Sempre ativo.' : 'Depende de consentimento.'}
                    </span>
                  </Row>
                ))}
              </dl>
              <P>
                Nada além do necessário roda antes da sua escolha, e recusar tem o mesmo peso
                que aceitar. Guardamos apenas versão do aviso, data/hora, método e categorias
                aceitas — a prova exigida pelo art. 8º, §1º. Vale {CONSENT_MAX_AGE_DAYS} dias e
                é reapresentado quando a versão muda. O sinal Global Privacy Control do
                navegador é respeitado como recusa.
              </P>
              <CookiePreferencesButton
                className={`${linkClass} type-caption self-start`}
              />
            </Section>

            <Section title="Compartilhamento e transferência internacional">
              <P>
                Não vendemos dados. Compartilhamos o mínimo necessário com operadores que
                executam o serviço em nosso nome: provedores de modelo de linguagem (EUA e
                União Europeia), infraestrutura de nuvem e CDN (Brasil e EUA), processador de
                pagamentos (Brasil) e plataforma de analytics (EUA, ativada só com
                consentimento). Também atendemos ordem judicial ou requisição de autoridade
                competente, no limite do pedido.
              </P>
              <P>
                Rotear para modelos fora do Brasil implica transferência internacional, feita
                com base nas cláusulas-padrão contratuais da Resolução CD/ANPD nº 19/2024 ou em
                outra hipótese do art. 33 da LGPD.
              </P>
            </Section>

            <Section title="Retenção">
              <dl className="flex flex-col gap-3">
                <Row term="Prompts e respostas">Não retidos — descartados após a entrega</Row>
                <Row term="Metadados de roteamento">12 meses, depois agregados</Row>
                <Row term="Registros de acesso">6 meses (Marco Civil, art. 15)</Row>
                <Row term="Dados fiscais">5 anos, por obrigação legal</Row>
                <Row term="Consentimento de cookies">{CONSENT_MAX_AGE_DAYS} dias, renovável</Row>
                <Row term="Conta encerrada">30 dias para eliminação definitiva</Row>
              </dl>
            </Section>

            <Section title="Segurança">
              <P>
                Adotamos medidas compatíveis com o art. 46 da LGPD: cifragem em trânsito e em
                repouso, segregação de ambientes, acesso mínimo com autenticação forte,
                auditoria e testes periódicos. Em incidente com risco relevante, comunicamos a
                ANPD e os titulares afetados.
              </P>
            </Section>

            <Section title="Decisões automatizadas">
              <P>
                O roteamento entre modelos é automatizado e considera disponibilidade, latência,
                custo e as regras da sua organização. É uma decisão técnica: não gera perfil
                nem efeitos jurídicos sobre você. Ainda assim, você pode pedir explicação ou
                revisão pelo canal do encarregado, conforme o art. 20.
              </P>
            </Section>

            <Section title="Crianças e adolescentes">
              <P>
                A Nylla é um produto para desenvolvedores e não é direcionada a menores de 18
                anos. Ao identificarmos tratamento sem o amparo do art. 14, eliminamos os dados.
              </P>
            </Section>

            <Section title="Seus direitos">
              <P>
                Você pode pedir confirmação e acesso, correção, anonimização, bloqueio ou
                eliminação, portabilidade, informação sobre compartilhamento e sobre as
                consequências de negar consentimento, revogação do consentimento e revisão de
                decisão automatizada. Basta escrever para{' '}
                <a href={`mailto:${CONTACT}`} className={linkClass}>
                  {CONTACT}
                </a>
                . O procedimento é gratuito e não exige conta.
              </P>
            </Section>

            <Section title="Alterações">
              <P>
                Mudanças relevantes são publicadas aqui com nova versão e data. Se afetarem
                finalidades sujeitas a consentimento, o aviso de cookies é reapresentado. A
                versão 2026.2 acrescentou a seção de prompts e a lista de operadores; a 2026.1
                trouxe consentimento granular e suporte a Global Privacy Control.
              </P>
            </Section>
          </div>

          <Link
            href="/"
            className="type-caption mt-14 inline-flex text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar ao início
          </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
