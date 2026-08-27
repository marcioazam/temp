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
        <Reveal>
          <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>recursos</span>
          </h2>
        </Reveal>

        <Reveal className="mt-6">
          <p className="type-title text-balance text-foreground">Um gateway. Todas as rotas resolvidas.</p>
          <p className="type-lead mt-6 max-w-3xl text-pretty text-muted-foreground">
            Cada provedor tem seu SDK e seu limite. O Nylla absorve essa diferença e entrega uma superfície única para
            o seu código.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <ul className="grid border-y border-border/70 sm:grid-cols-2">
            {features.map((f, index) => (
              <li
                key={f.key}
                className={`flex flex-col justify-start px-1 py-7 sm:px-7 sm:py-8 ${
                  index < 2 ? "border-b border-border/70" : ""
                } ${index % 2 === 1 ? "sm:border-l sm:border-border/70" : ""}`}
              >
                <h3 className="type-subheading max-w-xs text-pretty text-foreground">{f.title}</h3>
                <p className="type-body mt-3 max-w-xs text-pretty text-muted-foreground">{f.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
