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

        <div className="mt-6 grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-12">
          <div
            className="photo-grain h-full overflow-hidden bg-cover bg-center p-6 sm:p-8 lg:order-2"
            style={{ backgroundImage: "url('/images/recursos-polar.png')" }}
          >
            <Reveal className="relative z-[2] bg-background/85 p-5 backdrop-blur-md sm:p-6">
              <p className="type-title max-w-xl text-balance text-foreground">
                Um gateway. Todas as rotas resolvidas.
              </p>
              <p className="type-lead mt-6 max-w-md text-pretty text-muted-foreground">
                Cada provedor tem seu SDK e seu limite. O Nylla absorve essa diferença e entrega uma superfície única
                para o seu código.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="h-full lg:order-1">
            <ul className="grid h-full border-t border-border sm:grid-cols-2 sm:grid-rows-2">
              {features.map((f) => (
                <li
                  key={f.key}
                  className="flex flex-col justify-start border-b border-border py-6 sm:py-7 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-7 sm:[&:nth-child(odd)]:pr-7"
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
