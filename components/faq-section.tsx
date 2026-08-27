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
      "Não. A Nylla encaminha suas requisições aos provedores e não usa prompts ou respostas para treinar modelos próprios, exceto se o usuário permitir.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border">
      <div className="mx-auto grid w-full max-w-screen-2xl items-start gap-10 px-4 py-16 md:px-9 md:py-24 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
        <Reveal className="lg:sticky lg:top-24">
          <h2 id="faq-title" className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              {"// "}
            </span>
            faq
          </h2>
          <p className="mt-4 max-w-xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Perguntas frequentes.
          </p>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Tudo o que você precisa saber antes de conectar seu primeiro harness à Nylla.
          </p>
          <p className="mt-6 font-mono text-xs leading-relaxed text-ultra">
            Não encontrou sua resposta?{" "}
            <a
              href="/docs"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Consulte a documentação
            </a>
            .
          </p>
        </Reveal>

        <div className="grid gap-3">
          {questions.map((item, index) => (
            <Reveal key={item.question} delay={index * 70}>
              <details className="group border border-border/70 bg-background/85 transition-colors duration-300 hover:border-primary/40 open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-start gap-2.5 p-5 marker:content-none md:p-6">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary transition-transform duration-300 ease-out group-open:scale-110"
                  />
                  <h3 className="flex-1 text-pretty font-mono text-sm font-medium leading-snug text-foreground transition-colors duration-300 group-hover:text-primary group-open:text-primary">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3.5 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3.5 w-px bg-current" />
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-2xl px-5 pb-5 pl-[2.1rem] text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:pl-[2.35rem]">
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
