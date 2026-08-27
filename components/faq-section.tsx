import { Reveal } from "@/components/reveal"

const questions = [
  {
    question: "O que é a Nylla?",
    answer: "Um gateway único para usar vários modelos de IA no seu harness. Conecte uma vez e troque de modelo à vontade.",
  },
  {
    question: "Quais ferramentas posso conectar?",
    answer: "Claude Code, Codex, Cursor, Hermes Agent, VS Code e OpenCode. Novos harnesses entram continuamente.",
  },
  {
    question: "O acesso é realmente ilimitado?",
    answer: "Modelos padrão têm uso ilimitado sob uso justo. Modelos frontier consomem os créditos do seu plano.",
  },
  {
    question: "Posso trocar de modelo no meio do projeto?",
    answer: "Sim. O endpoint é o mesmo: nada de trocar chaves, SDKs ou configuração.",
  },
  {
    question: "Meus prompts treinam modelos?",
    answer: "Não. Encaminhamos suas requisições aos provedores e não treinamos nada com elas sem sua permissão.",
  },
  {
    question: "Como instalo?",
    answer: "npm i -g nylla e npx nylla connect. O CLI detecta o harness, aponta o gateway e valida sua chave.",
  },
  {
    question: "E quando os créditos frontier acabam?",
    answer: "Renovam todo mês (US$5 no dev, US$25 no pro). Ao esgotar, os modelos padrão seguem ilimitados.",
  },
  {
    question: "Qual a diferença entre os planos?",
    answer: "Dev: um harness. Pro: harnesses ilimitados e roteamento avançado. Team: créditos compartilhados e SSO.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Mensal, sem fidelidade. A mudança vale no ciclo seguinte.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto w-full max-w-screen-2xl px-4 md:px-9">
      <div className="grid w-full lg:grid-cols-[minmax(15rem,0.6fr)_minmax(0,1.4fr)]">
        <div
          className="relative z-[1] flex flex-col px-4 py-16 md:px-9 md:py-24 lg:pb-8 lg:pr-12"
          style={{
            backgroundColor: "var(--background)",
            backgroundImage: "none",
            backgroundBlendMode: "normal",
            animation: "none",
          }}
        >
          <Reveal className="flex flex-1 flex-col">
            <h2 id="faq-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
              <span>faq</span>
            </h2>
            <p className="type-title mt-6 max-w-xl text-balance text-foreground">Perguntas frequentes.</p>
            <p className="type-lead mt-5 max-w-sm text-pretty text-muted-foreground">
              O essencial antes de conectar seu primeiro harness.
            </p>
            <p className="type-small mt-7 max-w-xs text-pretty text-subtle-foreground">
              Falta algo?{" "}
              <a
                href="/docs"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Ver a documentação
              </a>
              <span className="text-foreground">.</span>
            </p>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="type-micro mt-7 inline-flex w-fit items-center gap-2 whitespace-nowrap border border-canvas-paper bg-canvas-paper px-3.5 py-2 text-background transition-opacity hover:opacity-90 lg:mt-auto"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3.5 shrink-0"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
              Whatsapp
            </a>

            <p className="type-small mt-5 text-subtle-foreground">
              E-mail:{" "}
              <a
                href="mailto:contato@nylla.com"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                contato@nylla.com
              </a>
            </p>
          </Reveal>
        </div>

        <div className="bg-[url('/images/faq-landscape.png')] bg-cover bg-center px-4 py-16 md:px-9 md:py-24">
          <Reveal>
            <div className="divide-y divide-border/60 border border-border/60 bg-background/85 backdrop-blur-md">
              {questions.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 marker:content-none md:px-5">
                    <h3 className="type-label flex-1 text-pretty text-sm text-foreground transition-colors duration-300 group-hover:text-primary group-open:text-primary">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="relative mt-1 size-3 shrink-0 text-subtle-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-current" />
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="type-body max-w-xl px-4 pb-4 text-sm text-muted-foreground md:px-5">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
