import { Reveal } from "@/components/reveal"

const features = [
  {
    key: "llms",
    title: "Compatível com todos os LLMs",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek e modelos open-source. Um único endpoint, roteamento transparente, sem lock-in de provedor.",
  },
  {
    key: "agents",
    title: "Feito para código e agents",
    body: "Otimizado para geração de código, tool calling e workflows de agents. Streaming de baixa latência e contexto longo onde importa.",
  },
  {
    key: "npm",
    title: "Plug and play via npm",
    body: "O pacote npm detecta seu harness e configura o gateway automaticamente. Um comando e sua ferramenta está conectada.",
  },
  {
    key: "open-source",
    title: "Núcleo open-source",
    body: "Modelos open-source sempre disponíveis para manter seus agentes rodando sem depender de uma única rota.",
  },
  {
    key: "catálogo",
    title: "Seleção semanal",
    body: "O catálogo é revisado toda semana para acompanhar novos modelos, melhorias e mudanças dos provedores.",
  },
  {
    key: "frontier",
    title: "Frontier por créditos",
    body: "Acesse modelos frontier sob demanda com créditos, sem configurar chaves separadas em cada provedor.",
  },
]

export function Features() {
  return (
    <section id="recursos">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <div>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              {"// "}
            </span>
            recursos
          </h2>
          <p className="mt-4 max-w-xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Um gateway. Todas as rotas resolvidas.
          </p>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Cada provedor tem seu SDK, seu limite e sua janela de contexto. O Nylla absorve essa diferença e entrega
            uma superfície única para o seu código e para os seus agentes.
          </p>
        </div>

        <Reveal delay={80} className="mt-10 md:mt-12">
          <div
            className="photo-grain bg-cover bg-center p-3 sm:p-5 lg:p-7"
            style={{ backgroundImage: "url('/images/recursos-polar.png')" }}
          >
            <ul className="relative z-[2] grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <li
                  key={f.key}
                  className="flex flex-col border border-border/70 bg-background/85 p-5 backdrop-blur-md md:p-6"
                >
                  <div className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary" />
                    <h3 className="font-mono text-sm font-medium leading-snug text-foreground">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
