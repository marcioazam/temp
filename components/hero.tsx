"use client"

import { Reveal } from "@/components/reveal"
import { HeroFlow } from "@/components/hero-flow"

export function Hero() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-background" aria-labelledby="about-title">
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
                Nylla é um gateway universal para inteligência artificial. Ele conecta seus agents, ferramentas e produtos aos principais modelos por uma única interface, sem prender sua operação a um provedor. Você mantém o fluxo que já usa enquanto o Nylla cuida da compatibilidade, disponibilidade e escolha do modelo para entregar respostas consistentes com menos complexidade operacional.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="w-full">
            <HeroFlow />
          </Reveal>
        </div>

      </div>
    </section>
  )
}
