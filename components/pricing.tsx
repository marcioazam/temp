import Link from "next/link"
import { Reveal } from "@/components/reveal"

const plans = [
  {
    name: "dev",
    price: "R$49",
    period: "/mês",
    tagline: "uso individual",
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
    tagline: "poder total",
    description: "Para quem vive dentro do editor.",
    features: [
      "Acesso ilimitado a LLMs padrão",
      "US$25 em créditos frontier/mês",
      "Harnesses ilimitados",
      "Políticas de roteamento avançadas",
      "Suporte prioritário",
    ],
    highlighted: true,
  },
  {
    name: "team",
    price: "R$129",
    period: "/usuário/mês",
    tagline: "para times",
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

function CrossMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-10 block size-2.5 ${className ?? ""}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/30" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/30" />
    </span>
  )
}

export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-title">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 id="planos-title" className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              {"// "}
            </span>
            planos
          </h2>
          <p className="mt-4 max-w-2xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            LLMs ilimitados. Créditos para os modelos frontier.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Todos os planos incluem acesso ilimitado aos LLMs padrão do gateway, mais créditos mensais de usage para os
            modelos frontier mais recentes.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <CrossMark className="-left-[5px] -top-[5px]" />
          <CrossMark className="-right-[5px] -top-[5px]" />
          <CrossMark className="-bottom-[5px] -left-[5px]" />
          <CrossMark className="-bottom-[5px] -right-[5px]" />

          <div className="photo-grain grid grid-cols-1 gap-2 bg-[url('/images/pricing-landscape.png')] bg-cover bg-center p-2 max-lg:gap-3 max-lg:p-3 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal
                as="article"
                key={plan.name}
                delay={i * 110}
                className={`group relative flex flex-col border backdrop-blur-sm ${
                  plan.highlighted
                    ? "border-ultra/40 bg-background/[0.93]"
                    : "border-border/60 bg-background/[0.88]"
                }`}
              >
                {plan.highlighted && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-ultra/25">
                    <span className="edge-sweep block h-full w-1/2 bg-ultra" />
                  </span>
                )}

                <div className="flex items-baseline justify-between border-b border-border/70 px-6 py-4 md:px-8">
                  <h3
                    className={`font-mono text-sm tracking-wide ${plan.highlighted ? "text-ultra" : "text-foreground"}`}
                  >
                    {plan.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {plan.highlighted ? (
                      <span className="text-ultra">recomendado</span>
                    ) : (
                      <span>{plan.tagline}</span>
                    )}
                  </span>
                </div>

                <div className="px-6 pb-2 pt-7 md:px-8">
                  <p className="font-mono font-medium tracking-tight text-foreground">
                    <span className={plan.highlighted ? "text-5xl" : "text-4xl"}>{plan.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-0 px-6 py-5 md:px-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 border-b border-border/50 py-2.5 font-mono text-xs leading-relaxed text-muted-foreground last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[5px] h-1.5 w-1.5 shrink-0 ${plan.highlighted ? "bg-ultra" : "bg-foreground/35"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto px-6 pb-7 md:px-8">
                  <Link
                    href="/docs"
                    className={`inline-flex h-11 w-full items-center justify-between px-4 font-mono text-xs transition-all active:scale-[0.99] ${
                      plan.highlighted
                        ? "border border-transparent bg-ultra text-primary-foreground hover:border-foreground"
                        : "border border-border text-foreground hover:border-foreground/40 hover:bg-muted"
                    }`}
                  >
                    <span>assinar {plan.name}</span>
                    <span
                      aria-hidden="true"
                      className="text-base leading-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      {"↗"}
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="text-ultra">
            *{" "}
          </span>
          Créditos frontier renovam mensalmente. Sem fidelidade. Faça upgrade, downgrade ou cancele a qualquer
          momento.
        </p>
      </div>
    </section>
  )
}
