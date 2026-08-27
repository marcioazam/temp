"use client"

import { Reveal } from "@/components/reveal"

const features = [
  {
    key: "llms",
    title: "Todos os LLMs",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek e open-source. Um endpoint, sem lock-in.",
  },
  {
    key: "npm",
    title: "Plug and play via npm",
    body: "O pacote detecta seu harness e configura o gateway. Um comando e está conectado.",
  },
  {
    key: "catálogo",
    title: "Seleção semanal",
    body: "O catálogo é revisado toda semana, acompanhando novos modelos e mudanças dos provedores.",
  },
  {
    key: "frontier",
    title: "Frontier por créditos ou ilimitado",
    body: "Créditos sob demanda ou acesso ilimitado, sem configurar chaves por provedor.",
  },
]

export function Features() {
  return (
    <section id="recursos">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
          <div
            className="photo-grain overflow-hidden bg-cover bg-center p-6 sm:p-8 lg:sticky lg:top-24"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, color-mix(in oklab, var(--background) 82%, transparent), color-mix(in oklab, var(--background) 94%, transparent)), url('/images/recursos-polar.png')",
            }}
          >
            <Reveal>
              <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
                <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
                <span>recursos</span>
              </h2>
              <p className="type-title mt-6 max-w-xl text-balance text-foreground">
                Um gateway. Todas as rotas resolvidas.
              </p>
              <p className="type-lead mt-6 max-w-md text-pretty text-muted-foreground">
                Cada provedor tem seu SDK e seu limite. O Nylla absorve essa diferença e entrega uma superfície única
                para o seu código.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ul className="grid border-t border-border sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f.key}
                  className="flex flex-col border-b border-border py-7 sm:py-8 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(odd)]:pr-8"
                >
                  <h3 className="type-subheading text-pretty text-foreground">{f.title}</h3>
                  <p className="type-body mt-3 max-w-sm text-pretty text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
