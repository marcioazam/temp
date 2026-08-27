"use client"

import { Reveal } from "@/components/reveal"
import { HeroFlow } from "@/components/hero-flow"

const FLOW_STAGES = [
  {
    label: "Entrada",
    text: "Seu agent ou produto envia uma requisição em um formato conhecido.",
  },
  {
    label: "Nylla",
    text: "O gateway valida, escolhe a rota ideal e normaliza cada resposta.",
  },
  {
    label: "Saída",
    text: "O modelo certo responde sem exigir mudanças no seu fluxo de trabalho.",
  },
]

export function Hero() {
  return (
    <section id="sobre" className="relative overflow-hidden border-y border-border bg-background" aria-labelledby="about-title">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="font-mono text-xs text-muted-foreground">
                <span aria-hidden="true" className="text-primary">{"// "}</span>
                o que é o Nylla
              </p>
              <h2 id="about-title" className="mt-5 max-w-xl text-balance font-sans text-4xl font-medium leading-tight tracking-[-0.04em] text-foreground md:text-6xl">
                A camada entre você e qualquer LLM.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Nylla é um gateway universal para inteligência artificial. Ele conecta seus agents, ferramentas e produtos aos principais modelos por uma única interface — sem prender sua operação a um provedor.
              </p>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                Você mantém o fluxo que já usa. O Nylla cuida da compatibilidade, disponibilidade e escolha do modelo para entregar respostas consistentes com menos complexidade operacional.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="w-full">
            <div className="border border-border bg-card p-5 sm:p-8 lg:p-10">
              <HeroFlow />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid border border-border md:grid-cols-3">
          {FLOW_STAGES.map((stage, index) => (
            <Reveal
              key={stage.label}
              delay={220 + index * 80}
              className="border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-mono text-sm font-medium text-foreground">{stage.label}</h3>
                <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
