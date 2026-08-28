import { Reveal } from "@/components/reveal"

const dots =
  "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--muted-foreground) 22%, transparent) 1px, transparent 0)"

const composition = [
  {
    id: "núcleo fixo",
    title: "Open-source sempre ativo",
    body: "Llama, Qwen, DeepSeek, Mistral, Gemma e companhia ficam permanentemente no catálogo. Nada entra em fila, nada sai sem aviso.",
  },
  {
    id: "rotação semanal",
    title: "Uma seleção nova toda semana",
    body: "Testamos lançamentos por capacidade real de código e custo por tarefa. O que passa entra no catálogo para todos os planos, no mesmo dia.",
  },
  {
    id: "frontier",
    title: "Os modelos de ponta por crédito",
    body: "Claude, GPT e Gemini de última geração consomem os créditos mensais do plano. Você escolhe quando vale gastar, sem contratar mais um provedor.",
  },
]

/** Metered usage: the bar fills, the meter ticks, the cost creeps up. */
function MeteredMeter() {
  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden border border-border/70 bg-background/60 p-4"
      style={{ backgroundImage: dots, backgroundSize: "12px 12px" }}
    >
      <span className="absolute right-3 top-3 h-2 w-2 bg-ultra/70" />
      <div className="mt-3 h-2 w-full bg-muted">
        <span className="meter-fill block h-2 origin-left bg-ultra" />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.06em] text-subtle-foreground">
        {["0", "1k", "10k", "100k"].map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="meter-tick w-2 bg-ultra/80"
            style={{ height: `${8 + (i % 3) * 6}px`, animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

/** Flat rate: one steady line, no meter to watch. */
function FlatMeter() {
  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden border border-border/70 bg-background/60 p-4"
      style={{ backgroundImage: dots, backgroundSize: "12px 12px" }}
    >
      <span className="type-micro absolute right-3 top-3 text-foreground/70">flat</span>
      <div className="mt-3 h-2 w-full bg-foreground/85" />
      <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.06em] text-subtle-foreground">
        <span>0</span>
        <span>∞</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="h-px flex-1 bg-border" />
        <span className="type-micro text-subtle-foreground">sem medidor</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}

export function CatalogSection() {
  return (
    <section id="catalogo">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <Reveal>
          <h2 className="type-eyebrow flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="relative -top-px size-1.5 shrink-0 rounded-full bg-primary" />
            <span>o catálogo</span>
          </h2>
          <p className="type-heading mt-6 max-w-3xl text-balance text-foreground">
            Todos os modelos. Sem prisão.
          </p>
          <p className="type-lead mt-5 max-w-xl text-muted-foreground">
            Um núcleo open-source fixo, sempre ativo, mais uma seleção nova que entra toda semana. Todo plano inclui o
            catálogo completo.
          </p>
          <p className="type-label mt-6 text-ultra">
            Curada semanalmente por capacidade e custo em todo o catálogo.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal
            as="article"
            delay={90}
            className="card-lift flex flex-col border border-border bg-card p-6 md:p-8"
          >
            <span className="type-eyebrow text-subtle-foreground">o problema</span>
            <div className="mt-5">
              <MeteredMeter />
            </div>
            <h3 className="type-subheading mt-6 text-foreground">Ansiedade por token</h3>
            <p className="type-body mt-3 text-muted-foreground">
              A cobrança medida transforma cada prompt em uma decisão de custo. Você hesita antes de perguntar, e o
              medidor sempre vence.
            </p>
          </Reveal>

          <Reveal
            as="article"
            delay={180}
            className="card-lift elev-window flex flex-col border border-foreground/25 bg-muted p-6 md:p-8"
          >
            <span className="type-eyebrow text-subtle-foreground">na nylla</span>
            <div className="mt-5">
              <FlatMeter />
            </div>
            <h3 className="type-subheading mt-6 text-foreground">Preço fixo, catálogo inteiro</h3>
            <p className="type-body mt-3 text-muted-foreground">
              Uma assinatura, acesso ilimitado aos LLMs padrão e créditos separados para os modelos frontier. Pergunte
              quantas vezes precisar, porque a fatura não muda.
            </p>
          </Reveal>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {composition.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={270 + i * 90}
              className="card-lift group relative overflow-hidden border border-border bg-card p-6"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-ultra/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="type-eyebrow text-ultra">{item.id}</span>
              <h3 className="type-subheading mt-4 text-foreground">{item.title}</h3>
              <p className="type-body mt-3 text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
