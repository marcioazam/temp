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
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true" className="text-primary">{"// "}</span>recursos
        </h2>

        <div className="mt-4 flex flex-col">
          {features.map((f, i) => (
            <Reveal
              as="article"
              key={f.key}
              delay={i * 70}
              className="py-8 md:py-10"
            >
              <h3 className="w-fit font-mono text-base font-medium leading-snug text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
