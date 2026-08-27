import { NyllaLogo } from "@/components/logo"

const icon = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const MODELS = [
  { name: "GPT", src: icon("openai") },
  { name: "Claude", src: icon("claude") },
  { name: "Gemini", src: icon("gemini") },
  { name: "Deepseek", src: icon("deepseek") },
  { name: "Nylla LLM", src: null },
]
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
    <figure
      aria-label="Papel da Nylla no fluxo entre sua ferramenta e os LLMs"
      className="mx-auto h-full w-full max-w-xl font-mono"
    >
      <div className="flex h-full flex-col justify-center p-5 sm:p-8 lg:p-10">
        {/* Node: user + tool */}
        <div className="flex flex-wrap items-center gap-2 border border-border bg-background/90 px-4 py-3 text-xs">
          <span className="text-muted-foreground">Você:</span>
          <span className="text-foreground">Claude Code, Codex, Cursor, Gemini CLI, etc...</span>
        </div>

        {/* Connector A */}
        <div className="relative flex h-11 justify-center" aria-hidden="true">
          <div className="relative h-full w-1 bg-border">
            <span className="hf-dot hf-dot-a-down bg-primary" />
            <span className="hf-dot hf-dot-a-up bg-primary" />
          </div>
        </div>

        {/* Node: Nylla */}
        <div className="relative flex min-h-16 items-center justify-between gap-6 border-0 bg-muted px-5 py-4 text-foreground outline-none ring-0">
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
          <div className="relative h-full w-1 bg-border">
            <span className="hf-dot hf-dot-b-down bg-primary" />
            <span className="hf-dot hf-dot-b-up bg-primary" />
          </div>
        </div>

        {/* Node: LLMs */}
        <div className="flex flex-wrap items-center gap-1.5 border border-border bg-background/90 px-4 py-3 text-xs">
          <span className="mr-0.5 text-muted-foreground">LLMs:</span>
          {MODELS.map((model, i) => (
            <span
              key={model.name}
              className="hf-model flex items-center gap-1 whitespace-nowrap border border-border px-1.5 py-1 text-foreground"
              style={{ "--model": i } as React.CSSProperties}
            >
              {model.src ? (
                <img
                  src={model.src || "/placeholder.svg"}
                  alt=""
                  className="h-2.5 w-2.5 shrink-0 object-contain grayscale brightness-0 invert"
                  loading="lazy"
                />
              ) : (
                <NyllaLogo aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-foreground" />
              )}
              {model.name}
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
