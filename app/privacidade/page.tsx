import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import { CONSENT_CATEGORIES, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Aviso de privacidade e cookies | Nylla',
  description:
    'Como a Nylla trata dados pessoais, prompts e cookies, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).',
}

const LAST_UPDATED = '27 de agosto de 2026'

const summary = [
  {
    label: 'Prompts',
    text: 'Seu conteúdo não treina modelo nenhum, nosso ou de terceiros.',
  },
  {
    label: 'Retenção',
    text: 'Retenção zero de prompts por padrão. Só metadados de roteamento persistem.',
  },
  {
    label: 'Cookies',
    text: 'Nenhum cookie de análise ou marketing antes do seu consentimento.',
  },
  {
    label: 'Controle',
    text: `Revogação em um clique, a qualquer momento. Renovação a cada ${CONSENT_MAX_AGE_DAYS} dias.`,
  },
]

const sections = [
  { id: 'controlador', label: 'Controlador e encarregado' },
  { id: 'dados', label: 'Dados que tratamos' },
  { id: 'finalidades', label: 'Finalidades e bases legais' },
  { id: 'prompts', label: 'Prompts e inferência' },
  { id: 'cookies', label: 'Cookies e consentimento' },
  { id: 'compartilhamento', label: 'Compartilhamento' },
  { id: 'internacional', label: 'Transferência internacional' },
  { id: 'retencao', label: 'Retenção e eliminação' },
  { id: 'seguranca', label: 'Segurança e incidentes' },
  { id: 'automatizado', label: 'Decisões automatizadas' },
  { id: 'criancas', label: 'Crianças e adolescentes' },
  { id: 'direitos', label: 'Seus direitos' },
  { id: 'alteracoes', label: 'Alterações' },
]

const dataGroups = [
  {
    title: 'Dados de conta',
    items: 'Nome, e-mail corporativo, organização, credenciais de API e registros de acesso.',
    origin: 'Fornecidos por você no cadastro.',
  },
  {
    title: 'Metadados de roteamento',
    items:
      'Modelo escolhido, contagem de tokens, latência, código de erro, harness de origem e data/hora.',
    origin: 'Gerados automaticamente a cada requisição ao gateway.',
  },
  {
    title: 'Dados de faturamento',
    items: 'Plano, consumo agregado, notas fiscais e dados exigidos pela legislação tributária.',
    origin: 'Você e o processador de pagamentos.',
  },
  {
    title: 'Dados técnicos do site',
    items: 'Endereço IP truncado, tipo de dispositivo, páginas vistas e preferência de idioma.',
    origin: 'Coletados no site — os não essenciais dependem de consentimento.',
  },
]

const purposes = [
  {
    purpose: 'Operar o gateway e rotear requisições',
    data: 'Conta, credenciais, metadados de roteamento',
    basis: 'Execução de contrato — art. 7º, V',
  },
  {
    purpose: 'Faturamento e obrigações fiscais',
    data: 'Conta, consumo, dados fiscais',
    basis: 'Obrigação legal — art. 7º, II',
  },
  {
    purpose: 'Segurança, antifraude e limite de uso',
    data: 'Registros de acesso, IP, metadados',
    basis: 'Legítimo interesse e obrigação legal — art. 7º, IX e II',
  },
  {
    purpose: 'Suporte técnico e comunicação de serviço',
    data: 'Conta, histórico de atendimento',
    basis: 'Execução de contrato — art. 7º, V',
  },
  {
    purpose: 'Métricas agregadas de uso do site',
    data: 'Dados técnicos do site',
    basis: 'Consentimento — art. 7º, I',
  },
  {
    purpose: 'Campanhas e conteúdo personalizado',
    data: 'Dados técnicos do site, identificadores de campanha',
    basis: 'Consentimento — art. 7º, I',
  },
]

const subprocessors = [
  {
    name: 'Provedores de modelo de linguagem',
    role: 'Inferência do prompt roteado',
    place: 'Estados Unidos e União Europeia',
    mechanism: 'Cláusulas-padrão contratuais da ANPD',
  },
  {
    name: 'Infraestrutura de nuvem e CDN',
    role: 'Hospedagem, cache e mitigação de ataques',
    place: 'Brasil e Estados Unidos',
    mechanism: 'Cláusulas-padrão contratuais da ANPD',
  },
  {
    name: 'Processador de pagamentos',
    role: 'Cobrança e emissão fiscal',
    place: 'Brasil',
    mechanism: 'Operador nacional',
  },
  {
    name: 'Plataforma de analytics',
    role: 'Métricas agregadas do site',
    place: 'Estados Unidos',
    mechanism: 'Cláusulas-padrão, ativado só com consentimento',
  },
]

const retention = [
  { what: 'Conteúdo de prompt e resposta', term: 'Não retido — descartado após a entrega' },
  { what: 'Metadados de roteamento', term: '12 meses, depois agregados de forma irreversível' },
  { what: 'Registros de acesso da aplicação', term: '6 meses (Marco Civil da Internet, art. 15)' },
  { what: 'Dados fiscais e de faturamento', term: '5 anos, por obrigação legal' },
  { what: 'Registro de consentimento de cookies', term: `${CONSENT_MAX_AGE_DAYS} dias, renovável` },
  { what: 'Dados de conta após encerramento', term: '30 dias para eliminação definitiva' },
]

const rights = [
  {
    title: 'Confirmação e acesso',
    text: 'Saber se tratamos seus dados e obter cópia deles.',
  },
  {
    title: 'Correção',
    text: 'Corrigir dados incompletos, inexatos ou desatualizados.',
  },
  {
    title: 'Anonimização, bloqueio ou eliminação',
    text: 'Para dados desnecessários, excessivos ou tratados em desconformidade.',
  },
  {
    title: 'Portabilidade',
    text: 'Transferir seus dados a outro fornecedor, mediante requisição.',
  },
  {
    title: 'Eliminação do que se baseia em consentimento',
    text: 'Exceto quando houver obrigação legal de guarda.',
  },
  {
    title: 'Informação sobre compartilhamento',
    text: 'Com quais entidades públicas e privadas compartilhamos dados.',
  },
  {
    title: 'Informação sobre negar consentimento',
    text: 'Quais são as consequências de recusar, antes de decidir.',
  },
  {
    title: 'Revogação do consentimento',
    text: 'A qualquer momento, por procedimento gratuito e facilitado.',
  },
  {
    title: 'Oposição e revisão',
    text: 'Opor-se a tratamento em legítimo interesse e pedir revisão de decisão automatizada.',
  },
]

const changelog = [
  { version: '2026.2', note: 'Seção de prompts e inferência; lista de subprocessadores publicada.' },
  { version: '2026.1', note: 'Consentimento granular por finalidade e suporte a Global Privacy Control.' },
]

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string
  index: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8">
      <div className="flex gap-4">
        <span aria-hidden="true" className="type-micro mt-1.5 w-6 flex-none text-primary">
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="type-heading text-foreground">{title}</h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

const linkClass =
  'text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary'

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main className="site-background">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-9">
          <header className="border-b border-border py-16 md:py-20">
            <p className="type-micro text-primary">LGPD · Lei 13.709/2018</p>
            <h1 className="type-title mt-4 max-w-3xl text-balance text-foreground">
              Aviso de privacidade e cookies
            </h1>
            <p className="type-lead mt-5 max-w-2xl text-pretty text-muted-foreground">
              Quais dados a Nylla trata, com qual finalidade, por quanto tempo e como você
              decide. Escrito para ser lido, não para ser assinado no escuro.
            </p>
            <dl className="type-micro mt-8 flex flex-wrap gap-x-8 gap-y-2 text-subtle-foreground">
              <div className="flex gap-2">
                <dt>Versão</dt>
                <dd className="text-foreground">{CONSENT_VERSION}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Atualizado em</dt>
                <dd className="text-foreground">{LAST_UPDATED}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Encarregado</dt>
                <dd>
                  <a href="mailto:privacidade@nylla.dev" className={linkClass}>
                    privacidade@nylla.dev
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          <section aria-label="Resumo" className="grid border-b border-border md:grid-cols-4">
            {summary.map((item, index) => (
              <div
                key={item.label}
                className={`py-7 md:px-7 md:first:pl-0 md:last:pr-0 ${
                  index > 0 ? 'border-t border-border md:border-t-0 md:border-l' : ''
                }`}
              >
                <p className="type-micro text-subtle-foreground">{item.label}</p>
                <p className="type-body mt-2 text-pretty text-foreground">{item.text}</p>
              </div>
            ))}
          </section>

          <div className="flex gap-16 py-14 md:py-20">
            <aside className="hidden w-56 flex-none lg:block">
              <nav aria-label="Índice do aviso" className="sticky top-24">
                <p className="type-micro text-subtle-foreground">Conteúdo</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="type-caption text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col gap-12 lg:max-w-3xl">
              <Section id="controlador" index={1} title="Controlador e encarregado">
                <p className="type-body text-muted-foreground">
                  A Nylla é a controladora dos dados pessoais tratados neste site e no
                  gateway. Para exercer direitos, tirar dúvidas ou apresentar reclamação,
                  fale com nosso encarregado de proteção de dados pelo e-mail{' '}
                  <a href="mailto:privacidade@nylla.dev" className={linkClass}>
                    privacidade@nylla.dev
                  </a>
                  . Respondemos em até 15 dias, conforme o art. 19 da LGPD.
                </p>
                <p className="type-caption mt-4 text-subtle-foreground">
                  Você também pode peticionar diretamente à Autoridade Nacional de Proteção
                  de Dados caso não fique satisfeito com nossa resposta.
                </p>
              </Section>

              <Section id="dados" index={2} title="Dados que tratamos">
                <dl className="divide-y divide-border border-y border-border">
                  {dataGroups.map((group) => (
                    <div key={group.title} className="py-4">
                      <dt className="type-label text-foreground">{group.title}</dt>
                      <dd className="type-caption mt-1 text-muted-foreground">{group.items}</dd>
                      <dd className="type-micro mt-1.5 text-subtle-foreground">{group.origin}</dd>
                    </div>
                  ))}
                </dl>
                <p className="type-caption mt-4 text-subtle-foreground">
                  Não coletamos dados sensíveis nem pedimos informação que o serviço não
                  precise para funcionar.
                </p>
              </Section>

              <Section id="finalidades" index={3} title="Finalidades e bases legais">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] border-collapse text-left">
                    <thead>
                      <tr className="border-y border-border">
                        <th scope="col" className="type-micro py-3 pr-4 text-subtle-foreground">
                          Finalidade
                        </th>
                        <th scope="col" className="type-micro py-3 pr-4 text-subtle-foreground">
                          Dados
                        </th>
                        <th scope="col" className="type-micro py-3 text-subtle-foreground">
                          Base legal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {purposes.map((row) => (
                        <tr key={row.purpose} className="border-b border-border align-top">
                          <td className="type-caption py-4 pr-4 text-foreground">{row.purpose}</td>
                          <td className="type-caption py-4 pr-4 text-muted-foreground">
                            {row.data}
                          </td>
                          <td className="type-caption py-4 text-muted-foreground">{row.basis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section id="prompts" index={4} title="Prompts e conteúdo de inferência">
                <p className="type-body text-muted-foreground">
                  O que você envia ao gateway é tratado como conteúdo do cliente, não como
                  matéria-prima nossa. Em termos práticos:
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    'Prompts e respostas trafegam cifrados e não são gravados por padrão.',
                    'Não usamos seu conteúdo para treinar, ajustar ou avaliar modelos.',
                    'Contratamos provedores de modelo com política de retenção zero, quando disponível.',
                    'Logs de depuração só existem se a sua organização os ativar, com prazo definido por ela.',
                    'Nenhum colaborador acessa conteúdo sem pedido explícito seu, registrado em auditoria.',
                  ].map((item) => (
                    <li key={item} className="type-body flex gap-3 text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 flex-none bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="type-caption mt-4 text-subtle-foreground">
                  Se você inserir dados pessoais de terceiros em um prompt, você atua como
                  controlador desse conteúdo e a Nylla como operadora.
                </p>
              </Section>

              <Section id="cookies" index={5} title="Cookies e consentimento">
                <dl className="divide-y divide-border border-y border-border">
                  {CONSENT_CATEGORIES.map((category) => (
                    <div key={category.id} className="py-4">
                      <dt className="type-label text-foreground">
                        {category.label}
                        <span className="type-micro ml-2 text-subtle-foreground">
                          {category.required
                            ? 'legítimo interesse / execução do serviço'
                            : 'consentimento'}
                        </span>
                      </dt>
                      <dd className="type-caption mt-1 text-muted-foreground">
                        {category.description}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="type-body mt-4 text-muted-foreground">
                  Nada além do estritamente necessário roda antes da sua escolha, e recusar
                  tem exatamente o mesmo peso que aceitar. O registro guarda apenas a versão
                  do aviso, a data/hora, o método e as categorias aceitas — é a prova de
                  consentimento exigida pelo art. 8º, §1º. Vale por{' '}
                  {CONSENT_MAX_AGE_DAYS} dias e é reapresentado quando a versão muda.
                </p>
                <p className="type-caption mt-4 text-subtle-foreground">
                  O sinal Global Privacy Control enviado pelo navegador é respeitado
                  automaticamente como recusa, sem interromper sua leitura.
                </p>
                <div className="mt-6">
                  <CookiePreferencesButton className="type-label inline-flex h-9 items-center border border-primary/70 bg-primary/15 px-5 text-primary transition-colors hover:bg-primary/25" />
                </div>
              </Section>

              <Section id="compartilhamento" index={6} title="Compartilhamento e subprocessadores">
                <p className="type-body text-muted-foreground">
                  Não vendemos dados pessoais. Compartilhamos o mínimo necessário com
                  operadores que executam o serviço em nosso nome, todos sob contrato com
                  obrigações de segurança e confidencialidade.
                </p>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[38rem] border-collapse text-left">
                    <thead>
                      <tr className="border-y border-border">
                        <th scope="col" className="type-micro py-3 pr-4 text-subtle-foreground">
                          Operador
                        </th>
                        <th scope="col" className="type-micro py-3 pr-4 text-subtle-foreground">
                          Papel
                        </th>
                        <th scope="col" className="type-micro py-3 pr-4 text-subtle-foreground">
                          Local
                        </th>
                        <th scope="col" className="type-micro py-3 text-subtle-foreground">
                          Mecanismo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subprocessors.map((row) => (
                        <tr key={row.name} className="border-b border-border align-top">
                          <td className="type-caption py-4 pr-4 text-foreground">{row.name}</td>
                          <td className="type-caption py-4 pr-4 text-muted-foreground">
                            {row.role}
                          </td>
                          <td className="type-caption py-4 pr-4 text-muted-foreground">
                            {row.place}
                          </td>
                          <td className="type-caption py-4 text-muted-foreground">
                            {row.mechanism}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="type-caption mt-4 text-subtle-foreground">
                  Também podemos compartilhar dados para cumprir ordem judicial ou
                  requisição de autoridade competente, sempre no limite do pedido.
                </p>
              </Section>

              <Section id="internacional" index={7} title="Transferência internacional">
                <p className="type-body text-muted-foreground">
                  Rotear para modelos hospedados fora do Brasil implica transferência
                  internacional de dados. Ela ocorre com base nas cláusulas-padrão
                  contratuais aprovadas pela Resolução CD/ANPD nº 19/2024, incorporadas aos
                  contratos com nossos operadores, ou em outra hipótese do art. 33 da LGPD.
                </p>
                <p className="type-caption mt-4 text-subtle-foreground">
                  Você pode escolher rotear apenas para modelos com região de execução no
                  Brasil ou na União Europeia nas configurações da sua organização.
                </p>
              </Section>

              <Section id="retencao" index={8} title="Retenção e eliminação">
                <dl className="divide-y divide-border border-y border-border">
                  {retention.map((row) => (
                    <div
                      key={row.what}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                    >
                      <dt className="type-caption text-foreground">{row.what}</dt>
                      <dd className="type-caption text-muted-foreground sm:text-right">
                        {row.term}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>

              <Section id="seguranca" index={9} title="Segurança e incidentes">
                <p className="type-body text-muted-foreground">
                  Adotamos medidas técnicas e administrativas compatíveis com o art. 46 da
                  LGPD: cifragem em trânsito e em repouso, segregação de ambientes, acesso
                  mínimo necessário com autenticação forte, registro de auditoria, revisão
                  periódica de dependências e testes de segurança.
                </p>
                <p className="type-body mt-4 text-muted-foreground">
                  Se ocorrer incidente de segurança com risco relevante aos titulares,
                  comunicamos a ANPD e as pessoas afetadas em prazo razoável, descrevendo os
                  dados envolvidos, os riscos e as medidas de mitigação adotadas.
                </p>
              </Section>

              <Section id="automatizado" index={10} title="Decisões automatizadas">
                <p className="type-body text-muted-foreground">
                  O roteamento entre modelos é automatizado e considera disponibilidade,
                  latência, custo e as regras definidas pela sua organização. Essa decisão é
                  técnica: não define perfil de personalidade, crédito, elegibilidade nem
                  produz efeitos jurídicos sobre você. Ainda assim, você pode solicitar
                  explicação sobre os critérios ou revisão da decisão pelo canal do
                  encarregado, conforme o art. 20 da LGPD.
                </p>
              </Section>

              <Section id="criancas" index={11} title="Crianças e adolescentes">
                <p className="type-body text-muted-foreground">
                  A Nylla é um produto para desenvolvedores e não é direcionada a menores de
                  18 anos. Não coletamos intencionalmente dados de crianças e adolescentes.
                  Ao identificarmos esse tratamento sem o amparo do art. 14 da LGPD,
                  eliminamos os dados imediatamente.
                </p>
              </Section>

              <Section id="direitos" index={12} title="Seus direitos e como exercer">
                <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {rights.map((right) => (
                    <div key={right.title}>
                      <dt className="type-label text-foreground">{right.title}</dt>
                      <dd className="type-caption mt-1 text-muted-foreground">{right.text}</dd>
                    </div>
                  ))}
                </dl>
                <p className="type-body mt-6 text-muted-foreground">
                  Para exercer qualquer um deles, escreva para{' '}
                  <a href="mailto:privacidade@nylla.dev" className={linkClass}>
                    privacidade@nylla.dev
                  </a>{' '}
                  com o pedido. Não cobramos nada e não exigimos que você crie conta ou faça
                  login para pedir.
                </p>
              </Section>

              <Section id="alteracoes" index={13} title="Alterações deste aviso">
                <p className="type-body text-muted-foreground">
                  Quando mudarmos algo relevante, publicamos aqui com nova versão e data.
                  Alterações que afetem finalidades sujeitas a consentimento reapresentam o
                  aviso de cookies para nova escolha.
                </p>
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {changelog.map((entry) => (
                    <div key={entry.version} className="flex gap-6 py-4">
                      <dt className="type-micro w-16 flex-none text-primary">{entry.version}</dt>
                      <dd className="type-caption text-muted-foreground">{entry.note}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    className="type-label inline-flex h-9 items-center border border-border px-5 text-foreground transition-colors hover:bg-secondary"
                  >
                    Voltar ao início
                  </Link>
                  <Link
                    href="/docs"
                    className="type-label inline-flex h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Ler a documentação
                  </Link>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
