const MODELS = ["GPT", "Claude", "Gemini", "Deepseek", "Nylla LLM"]
const STEPS = ["valida", "roteia", "entrega"]

/**
 * Minimalist animated map of Nylla's role: your tool on top, Nylla in the
 * middle, LLMs below. A request packet travels down the spine, Nylla's
 * internal steps light up in sequence, a model activates, and a response
 * packet (accent color) travels back up. Every animation is compositor-only
 * (opacity/transform) on a shared 6.4s cycle.
 */
export function HeroFlow() {
  return (
    <figure aria-label="Papel da Nylla no fluxo entre sua ferramenta e os LLMs" className="font-mono">
      <div className="flex flex-col">
        {/* Node: user + tool */}
        <div className="border border-border px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Você + ferramenta</span>
          <p className="mt-1 text-xs text-foreground">Claude Code, Cursor, seu agent</p>
        </div>

        {/* Connector A */}
        <div className="relative flex h-11 justify-center" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-a-down bg-foreground" />
            <span className="hf-dot hf-dot-a-up bg-primary" />
          </div>
        </div>

        {/* Node: Nylla */}
        <div className="relative border border-foreground bg-foreground px-4 py-3 text-background">
          <div className="flex items-center gap-2">
            <span className="status-pulse relative h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-background">Nylla</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-background">
            {STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-background">
                    →
                  </span>
                )}
                <span>{step}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Connector B */}
        <div className="relative flex h-11 justify-center" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-b-down bg-foreground" />
            <span className="hf-dot hf-dot-b-up bg-primary" />
          </div>
        </div>

        {/* Node: LLMs */}
        <div className="border border-border px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">LLMs</span>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {MODELS.map((model, i) => (
              <span
                key={model}
                className="hf-model border border-border px-2 py-1 text-foreground"
                style={{ "--model": i } as React.CSSProperties}
              >
                {model}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Sua ferramenta envia uma requisição, a Nylla valida, roteia e entrega ao melhor modelo, e a resposta volta no
        mesmo formato.
      </figcaption>
    </figure>
  )
}
