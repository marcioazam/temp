const MODELS = ["GPT", "Claude", "Gemini"]
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
        <div className="relative ml-6 flex h-11 items-center gap-3" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-a-down bg-foreground" />
            <span className="hf-dot hf-dot-a-up bg-primary" />
          </div>
          <span className="text-[10px] text-muted-foreground">uma requisição, um formato</span>
        </div>

        {/* Node: Nylla */}
        <div className="relative border border-foreground/60 bg-foreground/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="status-pulse relative h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground">Nylla</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            {STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-foreground/30">
                    →
                  </span>
                )}
                <span className="hf-step" style={{ "--step": i } as React.CSSProperties}>
                  {step}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Connector B */}
        <div className="relative ml-6 flex h-11 items-center gap-3" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-b-down bg-foreground" />
            <span className="hf-dot hf-dot-b-up bg-primary" />
          </div>
          <span className="text-[10px] text-muted-foreground">melhor rota no momento</span>
        </div>

        {/* Node: LLMs */}
        <div className="border border-border px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">LLMs</span>
          <div className="mt-1 flex items-center gap-4 text-xs">
            {MODELS.map((model, i) => (
              <span key={model} className="hf-model text-foreground" style={{ "--model": i } as React.CSSProperties}>
                {model}
              </span>
            ))}
            <span className="text-muted-foreground/60">e o que vier</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground" aria-hidden="true">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 bg-foreground" /> requisição
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 bg-primary" /> resposta
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        Sua ferramenta envia uma requisição, a Nylla valida, roteia e entrega ao melhor modelo, e a resposta volta no
        mesmo formato.
      </figcaption>
    </figure>
  )
}
