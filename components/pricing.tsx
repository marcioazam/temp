import Link from "next/link"

const plans = [
  {
    name: "dev",
    price: "Em breve",
    period: "",
    tagline: "individual",
    features: ["Detalhes em breve"],
    highlighted: false,
  },
  {
    name: "pro",
    price: "Em breve",
    period: "",
    tagline: "recomendado",
    features: ["Detalhes em breve"],
    highlighted: true,
  },
  {
    name: "team",
    price: "Em breve",
    period: "",
    tagline: "times",
    features: ["Detalhes em breve"],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-title">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 id="planos-title" className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
          <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
          <span>planos</span>
        </h2>
        <p className="type-title mt-6 max-w-2xl text-balance text-foreground">
          LLMs ilimitados. Frontier por créditos.
        </p>
        <p className="type-lead mt-5 max-w-xl text-pretty text-muted-foreground">
          Modelos padrão sem limite em todos os planos. Créditos mensais para os mais avançados.
        </p>

        <div className="relative mt-14">
          <p className="type-caption mb-4 flex items-center justify-end gap-2 text-subtle-foreground">
            <span aria-hidden="true" className="size-1 rounded-full bg-ultra" />
            Créditos renovados mensalmente. Cancele quando quiser.
          </p>
          <div className="photo-grain grid grid-cols-1 gap-px bg-[url('/images/pricing-landscape.png')] bg-cover bg-center px-6 py-16 md:px-12 md:py-24 lg:grid-cols-3 lg:gap-px lg:px-16 lg:py-32">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col ${
                  plan.highlighted
                    ? "bg-background/[0.86] ring-1 ring-inset ring-ultra/50 backdrop-blur-[1px]"
                    : "bg-background/[0.86] backdrop-blur-[1px]"
                }`}
              >
                <div className="flex items-baseline justify-between px-5 pt-5">
                  <h3 className={`type-micro ${plan.highlighted ? "text-ultra" : "text-foreground"}`}>{plan.name}</h3>
                  <span className={`type-eyebrow ${plan.highlighted ? "text-ultra" : "text-subtle-foreground"}`}>
                    {plan.tagline}
                  </span>
                </div>

                <p className={`flex items-baseline gap-1.5 px-5 pt-6 font-sans ${plan.highlighted ? "text-ultra" : "text-foreground"}`}>
                  <span className="text-[2rem] font-medium tracking-[-0.04em] tabular-nums">{plan.price}</span>
                  <span className={`type-label ${plan.highlighted ? "text-ultra/70" : "text-subtle-foreground"}`}>{plan.period}</span>
                </p>

                <ul className="flex-1 px-5 pt-7">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`type-caption flex gap-2.5 py-2 ${
                        plan.highlighted ? "text-ultra/80" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[7px] h-px w-2.5 shrink-0 ${plan.highlighted ? "bg-ultra" : "bg-foreground/30"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto px-5 pb-5 pt-8">
                  <Link
                    href="/docs"
                    className={`type-micro flex h-10 w-full items-center justify-center ${
                      plan.highlighted
                        ? "bg-ultra text-primary-foreground"
                        : "border border-border text-foreground"
                    }`}
                  >
                    em breve
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
