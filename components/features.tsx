import { Reveal } from "@/components/reveal"

const features = [
  {
    id: "01",
    title: "Compatível com todos os LLMs",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek e modelos open-source. Um único endpoint, roteamento transparente, sem lock-in de provedor.",
  },
  {
    id: "02",
    title: "Feito para código e agents",
    body: "Otimizado para geração de código, tool calling e workflows de agents. Streaming de baixa latência e contexto longo onde importa.",
  },
  {
    id: "03",
    title: "Plug and play via npm",
    body: "O pacote npm detecta seu harness e configura o gateway automaticamente. Um comando e sua ferramenta está conectada.",
  },
  {
    id: "04",
    title: "Failover e roteamento",
    body: "Se um provedor cai, o gateway redireciona a requisição. Defina prioridades por modelo, custo ou latência. O Nylla cuida do resto.",
  },
  {
    id: "05",
    title: "Núcleo open-source",
    body: "Modelos open-source sempre disponíveis para manter seus agentes rodando sem depender de uma única rota.",
  },
  {
    id: "06",
    title: "Seleção semanal",
    body: "O catálogo é revisado toda semana para acompanhar novos modelos, melhorias e mudanças dos provedores.",
  },
  {
    id: "07",
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
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal
              as="article"
              key={f.id}
              delay={i * 90}
              className="card-lift group relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-ultra/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="font-mono text-[10px] tracking-wide text-muted-foreground/70">{f.id}</span>
              <h3 className="mt-3 font-mono text-base font-medium text-foreground">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
