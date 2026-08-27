"use client"

import { Reveal } from "@/components/reveal"
import { HeroFlow } from "@/components/hero-flow"

export function Hero() {
  return (
    <section id="sobre" className="relative overflow-hidden" aria-labelledby="about-title">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 md:px-9 md:py-28">
        <div className="grid items-stretch gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
                <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
                <span>o que é o Nylla</span>
              </p>
              <h2 id="about-title" className="type-title mt-6 max-w-xl text-balance text-foreground">
                A camada entre você e qualquer LLM.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="type-lead mt-7 max-w-xl text-pretty text-muted-foreground">
                Nylla é um gateway universal de IA. Conecte seus agents, ferramentas e produtos aos principais modelos por uma única interface, sem depender de um único provedor. Você mantém seu fluxo atual. A Nylla cuida da compatibilidade, disponibilidade e roteamento.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={180}
            className="photo-grain w-full bg-[url('/images/hero-flow-landscape.png')] bg-cover bg-center"
          >
            <HeroFlow />
          </Reveal>
        </div>

      </div>
    </section>
  )
}
