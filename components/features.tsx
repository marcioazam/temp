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

        <div className="mt-4 grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:gap-x-20">
          {features.map((f, i) => (
            <Reveal
              as="article"
              key={f.key}
              delay={i * 70}
              className={`group relative border-b border-border py-8 md:py-10 ${
                i === 1 ? "md:pt-0" : ""
              } ${i === features.length - 1 ? "border-b-0" : ""} ${
                i === features.length - 2 ? "md:border-b-0" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-primary/60 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <h3 className="w-fit font-mono text-base font-medium leading-snug text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">{f.body}</p>

              {i === 0 ? (
                <>
                  <a
                    href="#catalogo"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
                  >
                    Ver catálogo completo
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <span className="photo-grain mt-6 block overflow-hidden rounded-lg">
                    <img
                      src="/images/mist-lake.png"
                      alt="Paisagem de lago com névoa entre montanhas"
                      className="block aspect-[4/3] w-full select-none object-cover"
                    />
                  </span>
                </>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
