"use client"

import { Reveal } from "@/components/reveal"

const features = [
  {
    key: "llms",
    title: "Todos os LLMs, sempre atualizados",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek e open-source em um único endpoint, sem lock-in. A seleção é revisada toda semana para acompanhar novos modelos e mudanças dos provedores.",
    link: "Explorar modelos",
    href: "#catalogo",
    image: "/images/recursos-polar.png",
  },
  {
    key: "npm",
    title: "Conecte qualquer harness",
    body: "O pacote detecta sua ferramenta e configura o gateway. Um comando e está conectado.",
    link: "Instalar via npm",
    href: "#instalar",
    image: "/images/connect-landscape.png",
  },
  {
    key: "frontier",
    title: "Frontier sem complexidade",
    body: "Use créditos sob demanda ou acesso ilimitado, sem configurar chaves por provedor.",
    link: "Conhecer os planos",
    href: "#planos",
    image: "/images/endpoint-landscape.png",
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
          <ul className="grid gap-3 md:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.key} className="flex min-h-[32rem] flex-col border border-border bg-card p-4 sm:p-5">
                <div>
                  <h3 className="type-subheading text-pretty text-foreground">{feature.title}</h3>
                  <p className="type-body mt-1 max-w-sm text-pretty text-muted-foreground">{feature.body}</p>
                  <a
                    href={feature.href}
                    className="mt-4 inline-flex min-h-11 items-center font-mono text-sm text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {feature.link} <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div
                  aria-hidden="true"
                  className="photo-grain mt-4 min-h-64 flex-1 overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('${feature.image}')` }}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
