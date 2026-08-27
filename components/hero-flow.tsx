import { NyllaLogo } from "@/components/logo"

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
      <div
        className="flex flex-col bg-cover bg-center p-5 sm:p-8 lg:p-10"
        style={{ backgroundImage: "url('/images/hero-flow-landscape.png')" }}
      >
        {/* Node: user + tool */}
        <div className="flex flex-wrap items-center gap-2 border border-border bg-background/90 px-4 py-3 text-xs">
          <span className="text-muted-foreground">Você:</span>
          <span className="text-foreground">Claude Code, Codex, Cursor, Gemini CLI, etc...</span>
        </div>

        {/* Connector A */}
        <div className="relative flex h-11 justify-center" aria-hidden="true">
          <div className="relative h-full w-px bg-border">
            <span className="hf-dot hf-dot-a-down bg-foreground" />
            <span className="hf-dot hf-dot-a-up bg-foreground" />
          </div>
        </div>

        {/* Node: Nylla */}
        <div className="relative flex min-h-16 items-center justify-between gap-6 border border-primary/45 bg-muted px-5 py-4 text-foreground">
          <NyllaLogo aria-hidden="true" className="hero-logo-unfold h-7 w-auto shrink-0 text-foreground" />
          <div className="flex items-center gap-2 text-xs text-foreground">
            {STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className={`hf-step hf-step-${i * 2}`}>
                    →
                  </span>
                )}
                <span className={`hf-step hf-step-${i * 2 + 1}`}>{step}</span>
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
        <div className="flex flex-wrap items-center gap-2 border border-border px-4 py-3 text-xs">
          <span className="text-muted-foreground">LLMs:</span>
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
      <figcaption className="sr-only">
        Sua ferramenta envia uma requisição, a Nylla valida, roteia e entrega ao melhor modelo, e a resposta volta no
        mesmo formato.
      </figcaption>
    </figure>
  )
}
