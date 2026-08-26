import { Reveal } from "@/components/reveal"

const steps = [
  {
    number: "01",
    label: "Requisição",
    detail: "POST /chat/completions",
    description: "Seu agente envia o objetivo, sem precisar escolher um modelo.",
  },
  {
    number: "02",
    label: "Autenticação",
    detail: "uma chave, toda ferramenta",
    description: "A chave Nylla valida o acesso e aplica os limites do seu plano.",
  },
  {
    number: "03",
    label: "Intenção",
    detail: "resultado, não modelo",
    description: "O pedido é interpretado por capacidade, contexto e custo.",
  },
  {
    number: "04",
    label: "Roteamento",
    detail: "decidido em tempo real",
    description: "Nylla escolhe a melhor rota disponível para aquela requisição.",
  },
  {
    number: "05",
    label: "Resposta",
    detail: "mesmo formato, streaming",
    description: "A resposta retorna no formato OpenAI que sua aplicação já entende.",
  },
]

export function RequestJourney() {
  return (
    <section id="como-funciona" className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <div className="h-px w-10 bg-ultra" aria-hidden="true" />
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ultra">por dentro da rota</p>
          <h2 className="mt-4 max-w-4xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-4xl">
            Uma requisição, do início ao fim.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Você pede um resultado. A Nylla valida, entende a intenção, escolhe a rota e assume o fallback se algo
            falhar — sem expor essa complexidade para o seu agente.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="border border-border bg-card/35 p-5 md:p-8 lg:p-10">
            <div className="relative">
              <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-border lg:left-0 lg:top-5 lg:h-px lg:w-full" aria-hidden="true" />
              <div className="request-path absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-ultra lg:left-0 lg:top-5 lg:h-px lg:w-full" aria-hidden="true" />

              <ol className="relative flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-4">
                {steps.map((step, index) => (
                  <li key={step.label} className="flex min-w-0 gap-5 lg:w-1/5 lg:flex-col lg:gap-4">
                    <div className="relative z-10 grid size-10 shrink-0 place-items-center border border-border bg-background font-mono text-[10px] text-muted-foreground">
                      <span className={index === 3 ? "text-ultra" : ""}>{step.number}</span>
                    </div>
                    <div className="min-w-0 lg:pr-5">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                        {step.label}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-ultra/90">{step.detail}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid border-t border-border pt-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">rota principal</p>
                <p className="mt-2 font-mono text-sm text-foreground">modelo disponível → resposta em streaming</p>
              </div>

              <div className="my-6 hidden h-12 w-px bg-border md:block" aria-hidden="true" />

              <div className="border-l border-ultra/50 pl-4 md:border-l-0 md:pl-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ultra">fallback automático</p>
                <p className="mt-2 font-mono text-sm text-foreground">falhou → próxima rota compatível</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Sua aplicação recebe a resposta no mesmo contrato. A troca acontece no meio, onde a Nylla opera.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground/70">
            O caminho direto é o caso comum. O desvio de fallback existe para que seu cliente nunca precise conhecê-lo.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
