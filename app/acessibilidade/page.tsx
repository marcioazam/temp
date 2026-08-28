import type { Metadata } from 'next'
import Link from 'next/link'
import { CONSENT_VERSION } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Declaração de acessibilidade | Nylla',
  description:
    'Compromisso, status de conformidade com WCAG 2.2 AA e NBR 17225, limitações conhecidas e canal de feedback de acessibilidade da Nylla.',
}

const LAST_UPDATED = '27 de agosto de 2026'
const REVIEWED = '27 de agosto de 2026'
const CONTACT = 'acessibilidade@nylla.dev'

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

/** Linha rótulo → valor, sem bordas nem tabela : igual às demais páginas legais. */
function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <dt className="type-caption text-foreground sm:w-64 sm:flex-none">{term}</dt>
      <dd className="type-caption text-muted-foreground">{children}</dd>
    </div>
  )
}

export default function AccessibilityPage() {
  return (
    <main className="site-background">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="type-heading text-foreground">Declaração de acessibilidade</h1>
          <p className="type-micro mt-3 text-subtle-foreground">
            Versão {CONSENT_VERSION} · Atualizado em {LAST_UPDATED}
          </p>
          <p className="type-caption mt-6 text-pretty text-muted-foreground">
            A Nylla quer ser usável por qualquer pessoa, independentemente de deficiência,
            dispositivo ou tecnologia assistiva. Esta página descreve nosso status real de
            conformidade, o que ainda não está pronto e como falar com a gente quando algo
            atrapalhar seu uso.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <Section title="Status de conformidade">
              <dl className="flex flex-col gap-3">
                <Row term="Norma de referência">
                  WCAG 2.2, do W3C, e ABNT NBR 17225, que adota as WCAG 2.2 como base técnica no
                  Brasil.
                </Row>
                <Row term="Nível pretendido">AA</Row>
                <Row term="Status atual">
                  <span className="text-foreground">Parcialmente conforme</span>: a maior parte
                  do site atende ao nível AA, com as exceções listadas em limitações conhecidas.
                </Row>
                <Row term="Base legal">
                  Lei Brasileira de Inclusão (Lei 13.146/2015), arts. 53 e 63.
                </Row>
              </dl>
            </Section>

            <Section title="Recursos de acessibilidade">
              <dl className="flex flex-col gap-3">
                <Row term="Estrutura semântica">
                  Marcos de página, hierarquia de títulos e listas nativas, para navegação por
                  regiões em leitores de tela.
                </Row>
                <Row term="Teclado">
                  Todos os controles interativos, incluindo o banner de cookies, são operáveis por
                  teclado, com indicador de foco visível.
                </Row>
                <Row term="Contraste e texto">
                  O tema é calibrado para contraste AA. O texto pode ser ampliado até 200% sem
                  perda de conteúdo, e o zoom não é bloqueado.
                </Row>
                <Row term="Movimento reduzido">
                  Transições e animações são desativadas quando o sistema sinaliza{' '}
                  <code className="text-foreground">prefers-reduced-motion</code>.
                </Row>
                <Row term="Imagens e ícones">
                  Imagens informativas têm texto alternativo; ícones decorativos são ocultados de
                  tecnologias assistivas.
                </Row>
                <Row term="Idioma">
                  O idioma da página é declarado no HTML, e o seletor PT/EN está disponível na
                  navegação.
                </Row>
              </dl>
            </Section>

            <Section title="Limitações conhecidas">
              <P>
                Somos transparentes sobre o que ainda não está acessível. No momento, temos
                ciência dos seguintes pontos:
              </P>
              <dl className="flex flex-col gap-3">
                <Row term="Diagramas técnicos">
                  Alguns diagramas de arquitetura e fluxo de roteamento ainda não têm descrição
                  longa equivalente em texto.
                </Row>
                <Row term="Saída de modelos de IA">
                  O conteúdo gerado pelos modelos não passa pelo nosso controle editorial e pode
                  vir sem estrutura semântica adequada.
                </Row>
                <Row term="Conteúdo de terceiros">
                  Páginas e documentação hospedadas por provedores de modelo seguem as práticas de
                  acessibilidade deles.
                </Row>
                <Row term="Auditoria externa">
                  Ainda não realizamos auditoria independente formal. Ela está planejada e o
                  status desta página será atualizado quando concluída.
                </Row>
              </dl>
            </Section>

            <Section title="Compatibilidade">
              <P>
                O site é desenvolvido com HTML, CSS e JavaScript padrão e testado nas versões
                atuais de Chrome, Firefox, Safari e Edge, em desktop e mobile, com NVDA, VoiceOver
                e TalkBack. Navegadores sem suporte a JavaScript ou muito antigos podem apresentar
                degradação de funcionalidade.
              </P>
            </Section>

            <Section title="Como avaliamos">
              <dl className="flex flex-col gap-3">
                <Row term="Método">
                  Auto-avaliação contínua durante o desenvolvimento, combinada com verificação
                  automatizada e testes manuais de teclado e leitor de tela.
                </Row>
                <Row term="Preparada em">{LAST_UPDATED}</Row>
                <Row term="Última revisão">{REVIEWED}</Row>
                <Row term="Próxima revisão">
                  A cada mudança relevante de interface, e no mínimo uma vez por ano.
                </Row>
              </dl>
            </Section>

            <Section title="Feedback e contato">
              <P>
                Se qualquer barreira impedir seu uso do site ou do gateway, escreva para{' '}
                <a href={`mailto:${CONTACT}`} className={linkClass}>
                  {CONTACT}
                </a>
                . Descreva a página, o que você tentou fazer e a tecnologia assistiva utilizada.
                Respondemos em até 10 dias úteis e informamos o prazo de correção quando a
                solução exigir mais tempo.
              </P>
            </Section>

            <Section title="Se não resolvermos">
              <P>
                Caso a resposta não seja satisfatória, você pode acionar os órgãos de defesa do
                consumidor, o Ministério Público ou o Poder Judiciário, com base na Lei Brasileira
                de Inclusão. Questões relativas a dados pessoais são tratadas no{' '}
                <Link href="/privacidade" className={linkClass}>
                  aviso de privacidade
                </Link>
                , e as regras contratuais estão nos{' '}
                <Link href="/termos" className={linkClass}>
                  termos de uso
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
