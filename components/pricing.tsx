import Link from "next/link"
import { Reveal } from "@/components/reveal"

const plans = [
  {
    name: "dev",
    price: "R$49",
    period: "/mês",
    description: "Para uso individual no dia a dia.",
    features: [
      "Acesso ilimitado a LLMs padrão",
      "US$5 em créditos frontier/mês",
      "1 harness conectado",
      "Suporte via comunidade",
    ],
    highlighted: false,
  },
  {
    name: "pro",
    price: "R$149",
    period: "/mês",
    description: "Para quem vive dentro do editor.",
    features: [
      "Acesso ilimitado a LLMs padrão",
      "US$25 em créditos frontier/mês",
      "Harnesses ilimitados",
      "Roteamento e failover avançados",
      "Suporte prioritário",
    ],
    highlighted: true,
  },
  {
    name: "team",
    price: "R$129",
    period: "/usuário/mês",
    description: "Para times e agents em produção.",
    features: [
      "Tudo do pro",
      "Créditos frontier compartilhados",
      "Gestão centralizada de chaves",
      "Analytics de usage por membro",
      "SSO e controle de acesso",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="planos">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true" className="text-primary">{"// "}</span>planos
        </h2>
        <p className="mt-4 max-w-2xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          LLMs ilimitados. Créditos para os modelos frontier.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Todos os planos incluem acesso ilimitado aos LLMs padrão do gateway, mais créditos mensais de usage para os
          modelos frontier mais recentes.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal
              as="article"
              key={plan.name}
              delay={i * 110}
              className={`card-lift relative flex flex-col overflow-hidden rounded-2xl border p-6 md:p-8 ${
                plan.highlighted
                  ? "elev-window border-foreground/25 bg-muted"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full overflow-hidden">
                  <span className="edge-sweep block h-px w-1/2 bg-ultra" />
                </span>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm text-foreground">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full border border-ultra/40 bg-ultra/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ultra">
                    popular
                  </span>
                )}
              </div>
              <p className="mt-4 font-mono text-3xl font-medium text-foreground">
                {plan.price}
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 font-mono text-xs leading-relaxed text-muted-foreground">
                    <span className="shrink-0 text-base leading-none text-foreground/60" aria-hidden="true">
                      +
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/docs"
                className={`mt-8 inline-flex h-10 items-center justify-center border font-mono text-xs transition-all active:scale-[0.98] ${
                  plan.highlighted
                    ? "border-foreground bg-foreground text-background hover:opacity-85"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                assinar {plan.name}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
