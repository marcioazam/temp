import type { Metadata } from 'next'
import Link from 'next/link'
import { CONSENT_VERSION } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Termos de uso | Nylla',
  description:
    'Contrato de uso do gateway de IA da Nylla: uso aceitável, provedores de modelo, cobrança, responsabilidade e rescisão.',
}

const LAST_UPDATED = '27 de agosto de 2026'
const CONTACT = 'juridico@nylla.dev'

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

/** Linha rótulo → valor, sem bordas nem tabela — igual ao aviso de privacidade. */
function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <dt className="type-caption text-foreground sm:w-64 sm:flex-none">{term}</dt>
      <dd className="type-caption text-muted-foreground">{children}</dd>
    </div>
  )
}

export default function TermsPage() {
  return (
    <main className="site-background">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="type-heading text-foreground">Termos de uso</h1>
          <p className="type-micro mt-3 text-subtle-foreground">
            Versão {CONSENT_VERSION} · Atualizado em {LAST_UPDATED}
          </p>
          <p className="type-caption mt-6 text-pretty text-muted-foreground">
            Estes termos regem o uso da Nylla, um gateway universal de IA. O tratamento de
            dados pessoais é descrito em separado no{' '}
            <Link href="/privacidade" className={linkClass}>
              aviso de privacidade
            </Link>
            . Ao criar uma conta ou usar o serviço, você concorda com o que está aqui.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <Section title="Aceite">
              <P>
                Ao criar uma conta ou enviar qualquer requisição ao gateway, você aceita estes
                termos e declara ter lido e compreendido seu conteúdo. Se você aceita em nome de
                uma organização, declara ter poderes para vinculá-la. É preciso ter 18 anos ou
                mais e capacidade civil para contratar.
              </P>
            </Section>

            <Section title="O serviço">
              <P>
                A Nylla expõe um endpoint único que recebe suas requisições e as roteia para o
                modelo de linguagem apropriado, escolhido por disponibilidade, latência, custo e
                pelas regras da sua organização. Atuamos como intermediário técnico entre você e
                os provedores de modelo — não desenvolvemos os modelos nem garantimos qualquer
                resultado específico de inferência.
              </P>
            </Section>

            <Section title="Conta e credenciais">
              <P>
                Você é responsável por manter seus dados de cadastro verdadeiros e atualizados e
                por proteger o sigilo das suas chaves de API. Toda requisição autenticada com a
                sua chave é atribuída a você, ainda que feita por terceiro. Comunique-nos
                imediatamente qualquer uso não autorizado.
              </P>
            </Section>

            <Section title="Uso aceitável">
              <P>Ao usar a Nylla, você concorda em não:</P>
              <dl className="flex flex-col gap-3">
                <Row term="Conteúdo ilícito">
                  Gerar ou distribuir material ilegal, abuso infantil, incitação à violência ou
                  discurso de ódio.
                </Row>
                <Row term="Segurança">
                  Contornar filtros de segurança dos modelos, tentar extrair dados de treino ou
                  atacar a infraestrutura.
                </Row>
                <Row term="Abuso de terceiros">
                  Fraude, spam, engenharia social, violação de propriedade intelectual ou de
                  dados pessoais de terceiros.
                </Row>
                <Row term="Sobrecarga">
                  Exceder limites de uso, revender capacidade bruta ou automatizar acesso além do
                  contratado.
                </Row>
              </dl>
              <P>
                Além destas regras, aplicam-se as políticas de uso aceitável de cada provedor de
                modelo para o qual sua requisição for roteada.
              </P>
            </Section>

            <Section title="Provedores de modelo">
              <P>
                Suas requisições são encaminhadas a provedores como OpenAI, Anthropic, Google,
                xAI e DeepSeek. O tratamento pelo provedor é regido pelos termos dele
                (&ldquo;Provider Terms&rdquo;), que você também aceita ao rotear para o modelo
                correspondente. O modelo efetivamente usado pode variar conforme a
                disponibilidade; a indisponibilidade ou mudança de política de um provedor
                externo não constitui falha da Nylla.
              </P>
            </Section>

            <Section title="Conteúdo e saída">
              <P>
                A entrada que você envia é sua. Você nos concede apenas a licença limitada e
                temporária necessária para transmitir e processar aquela requisição. A
                titularidade da saída gerada por IA segue os termos do provedor e pode não ser
                protegida por direito autoral; saídas idênticas ou semelhantes podem ser geradas
                para outros usuários, sem exclusividade. Você é responsável por revisar a saída
                antes de qualquer uso.
              </P>
            </Section>

            <Section title="Sem garantia sobre resultados de IA">
              <P>
                A saída dos modelos é fornecida no estado em que se encontra. Modelos de
                linguagem podem produzir informação imprecisa, desatualizada ou inventada. A
                Nylla não garante exatidão, adequação a um fim específico nem ausência de erros,
                e a saída não substitui aconselhamento profissional. É vedado usá-la como decisão
                final automatizada em contextos de saúde, jurídico, financeiro ou de segurança
                sem supervisão humana qualificada.
              </P>
            </Section>

            <Section title="Planos, medição e cobrança">
              <dl className="flex flex-col gap-3">
                <Row term="Medição">
                  O consumo é medido pela telemetria da Nylla (tokens, requisições), que é a
                  fonte oficial de faturamento.
                </Row>
                <Row term="Pagamento">
                  Conforme o plano contratado, pré-pago ou por assinatura, com os tributos
                  aplicáveis.
                </Row>
                <Row term="Contestação">
                  Divergências de fatura podem ser contestadas em até 30 dias da emissão.
                </Row>
                <Row term="Reajuste">
                  Mudanças de preço são comunicadas com 30 dias de antecedência e valem para o
                  ciclo seguinte.
                </Row>
              </dl>
            </Section>

            <Section title="Disponibilidade e suporte">
              <P>
                Empregamos melhores esforços para manter o gateway disponível, mas não há SLA no
                plano gratuito. Manutenções programadas são avisadas quando possível, e janelas
                de degradação causadas por provedores externos estão fora do nosso controle.
                Planos com SLA contratual têm suas próprias regras de crédito.
              </P>
            </Section>

            <Section title="Propriedade intelectual da Nylla">
              <P>
                A marca, o software, a documentação e a identidade visual da Nylla são nossos.
                Concedemos a você uma licença de uso não exclusiva e intransferível para acessar
                o serviço conforme estes termos. É vedado fazer engenharia reversa, copiar ou
                revender o serviço como produto concorrente.
              </P>
            </Section>

            <Section title="Suspensão e rescisão">
              <P>
                Podemos suspender ou encerrar o acesso em caso de violação destes termos,
                inadimplência ou ordem de autoridade competente, buscando avisar você quando
                possível. Você pode encerrar sua conta a qualquer momento. Encerrada a conta, os
                dados são eliminados em até 30 dias, conforme o{' '}
                <Link href="/privacidade" className={linkClass}>
                  aviso de privacidade
                </Link>
                , ressalvadas as retenções exigidas por lei.
              </P>
            </Section>

            <Section title="Limitação de responsabilidade">
              <P>
                Na máxima extensão permitida em lei, a responsabilidade total da Nylla fica
                limitada ao valor que você pagou nos 12 meses anteriores ao evento, e não
                respondemos por lucros cessantes ou danos indiretos. Estes limites{' '}
                <span className="text-foreground">não se aplicam</span> a dolo, culpa grave, dano
                a dados pessoais nem a direitos que o Código de Defesa do Consumidor torne
                indisponíveis quando você contratar como consumidor.
              </P>
            </Section>

            <Section title="Alterações, lei e foro">
              <P>
                Mudanças relevantes são publicadas aqui com nova versão e data e comunicadas com
                30 dias de antecedência. Estes termos são regidos pela lei brasileira. Fica
                eleito o foro da comarca da sede da Nylla, ressalvado o direito de o consumidor
                acionar no foro do seu próprio domicílio (art. 101, I, do CDC). Fale com o
                jurídico em{' '}
                <a href={`mailto:${CONTACT}`} className={linkClass}>
                  {CONTACT}
                </a>
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
