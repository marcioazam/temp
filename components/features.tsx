"use client"

import { useEffect, useState } from "react"
import { Reveal } from "@/components/reveal"

const features = [
  {
    key: "llms",
    title: "Compatível com todos os LLMs",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek e modelos open-source. Um único endpoint, roteamento transparente, sem lock-in de provedor.",
  },
  {
    key: "npm",
    title: "Plug and play via npm",
    body: "O pacote npm detecta seu harness e configura o gateway automaticamente. Um comando e sua ferramenta está conectada.",
  },
  {
    key: "catálogo",
    title: "Seleção semanal",
    body: "O catálogo é revisado toda semana para acompanhar novos modelos, melhorias e mudanças dos provedores.",
  },
  {
    key: "frontier",
    title: "Frontier por créditos ou ilimitado",
    body: "Use modelos frontier com créditos sob demanda ou escolha acesso ilimitado, tudo em um único gateway, sem configurar chaves por provedor.",
  },
]

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const interval = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="recursos">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
          <div className="lg:sticky lg:top-24">
            <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
              <span>recursos</span>
            </h2>
            <p className="type-title mt-6 max-w-xl text-balance text-foreground">
              Um gateway. Todas as rotas resolvidas.
            </p>
            <p className="type-lead mt-6 max-w-xl text-pretty text-muted-foreground">
              Cada provedor tem seu SDK, seu limite e sua janela de contexto. O Nylla absorve essa diferença e entrega
              uma superfície única para o seu código e para os seus agentes.
            </p>
          </div>

          <Reveal delay={80}>
            <div
              className="photo-grain bg-cover bg-center p-3 sm:p-5 lg:p-6"
              style={{ backgroundImage: "url('/images/recursos-polar.png')" }}
            >
              <ul className="relative z-[2] grid gap-3 sm:grid-cols-2">
                {features.map((f, index) => {
                  const isActive = index === activeFeature

                  return (
                    <li
                    key={f.key}
                    className={`relative flex flex-col border border-border/70 bg-background/85 p-5 backdrop-blur-md transition-transform duration-300 ease-out md:p-6 ${isActive ? "motion-safe:-translate-y-0.5" : ""}`}
                  >
                    <span
                      key={isActive ? `progress-${activeFeature}` : undefined}
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-px w-full origin-left bg-primary/70 ${isActive ? "animate-feature-progress" : "scale-x-0"}`}
                    />
                    <div className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary transition-transform duration-300 ease-out ${isActive ? "scale-110" : ""}`}
                      />
                      <h3 className={`type-subheading transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}>
                        {f.title}
                      </h3>
                    </div>
                    <p className="type-body mt-3 text-muted-foreground">{f.body}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
