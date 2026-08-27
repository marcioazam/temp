import { RotorMark } from "@/components/logo"

const MODELS = ["GPT", "Claude", "Gemini", "Deepseek", "Nylla LLM"]
const STEPS = ["Valida", "Roteia", "Entrega"]

/**
 * Minimalist animated map of Nylla's role: your tool on top, Nylla in the
 * middle, LLMs below. A request packet travels down the spine, Nylla's
 * internal steps light up in sequence, a model activates, and a response
 * packet (accent color) travels back up. Every animation is compositor-only
 * (opacity/transform) on a shared 3.2s cycle.
 */
export function HeroFlow() {
  return (
    <figure aria-label="Papel da Nylla no fluxo entre sua ferramenta e os LLMs" className="font-mono">
      <div className="flex flex-col">
        {/* Node: user + tool */}
        <div className="border border-border px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Você + ferramenta</span>
          <p className="mt-1 text-xs text-foreground">Claude Code, Codex, Cursor, Gemini CLI, etc...</p>
        </div>

        {/* Connector A */}
        <div className="relative flex h-11 justify-center" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-a-down bg-foreground" />
            <span className="hf-dot hf-dot-a-up bg-foreground" />
          </div>
        </div>

        {/* Node: Nylla */}
        <div className="relative flex items-center justify-between gap-4 border border-primary/45 bg-muted px-4 py-3 text-foreground">
          <div className="flex shrink-0 items-center gap-2">
            <RotorMark aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Nylla</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground">
            {STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-primary/55">
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
            <span className="hf-dot hf-dot-b-up bg-foreground" />
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
