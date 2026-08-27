import { Reveal } from "@/components/reveal"

const questions = [
  {
    question: "O que é a Nylla?",
    answer:
      "A Nylla é um gateway único para usar diferentes modelos de IA nos seus harnesses de programação. Você conecta uma vez e troca de modelo sem refazer sua configuração.",
  },
  {
    question: "Quais ferramentas posso conectar?",
    answer:
      "Claude Code, Codex, Cursor, Hermes Agent, VS Code e OpenCode já fazem parte da integração. Novos harnesses entram conforme o ecossistema evolui.",
  },
  {
    question: "O acesso aos modelos é realmente ilimitado?",
    answer:
      "Os modelos padrão do catálogo têm uso ilimitado dentro da política de uso justo. Modelos frontier usam os créditos mensais incluídos no seu plano.",
  },
  {
    question: "Posso trocar de modelo durante um projeto?",
    answer:
      "Sim. O endpoint continua o mesmo: você escolhe outro modelo sem trocar chaves, SDKs ou a configuração do harness.",
  },
  {
    question: "Meus prompts são usados para treinar modelos?",
    answer:
      "Não. A Nylla encaminha suas requisições aos provedores e não usa prompts ou respostas para treinar modelos próprios.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-16 md:px-9 md:py-24">
        <Reveal className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ultra">06 · FAQ</p>
          <h2 id="faq-title" className="mt-5 max-w-md text-balance font-sans text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Perguntas frequentes.
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Tudo o que você precisa saber antes de conectar seu primeiro harness à Nylla.
          </p>
          <p className="mt-8 font-mono text-xs leading-relaxed text-muted-foreground">
            Não encontrou sua resposta?{" "}
            <a href="/docs" className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground">
              Consulte a documentação
            </a>
            .
          </p>
        </Reveal>

        <div className="border-t border-border">
          {questions.map((item, index) => (
            <Reveal key={item.question} delay={index * 70}>
              <details className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-sans text-base font-medium text-foreground marker:content-none md:py-7 md:text-lg">
                  <span className="text-pretty">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-current" />
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pr-10 text-pretty leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
