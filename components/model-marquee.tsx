const models = [
  "claude-sonnet-4.5",
  "gpt-5.1-codex",
  "gemini-3-pro",
  "deepseek-v3.2",
  "kimi-k2-thinking",
  "llama-4-maverick",
  "mistral-large-3",
  "qwen3-coder",
  "grok-code-fast",
  "glm-4.6",
]

export function ModelMarquee() {
  const track = [...models, ...models]

  return (
    <section aria-label="Modelos disponíveis no gateway" className="border-b border-border bg-card/40">
      <div className="marquee-mask relative overflow-hidden py-4">
        <ul className="marquee-track flex w-max items-center gap-8 pl-8">
          {track.map((model, i) => (
            <li
              key={`${model}-${i}`}
              aria-hidden={i >= models.length ? "true" : undefined}
              className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground"
            >
              <span className="h-1 w-1 bg-border" aria-hidden="true" />
              {model}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <dl className="grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {[
            { k: "modelos", v: "120+" },
            { k: "harnesses", v: "12" },
            { k: "latência p50", v: "38ms" },
          ].map((s) => (
            <div
              key={s.k}
              className="border-b border-border px-4 py-6 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <dd className="font-mono text-2xl font-medium text-foreground">{s.v}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
