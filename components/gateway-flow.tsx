"use client"

import { useVisibleCycle } from "@/hooks/use-visible-cycle"

const MODELS = ["claude-sonnet", "gpt", "gemini", "llama", "deepseek", "mistral"]

export function GatewayFlow() {
  const { ref, index: active } = useVisibleCycle<HTMLElement>(MODELS.length, 1400)

  return (
    <section ref={ref}>
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true">{"// "}</span>roteamento
        </h2>
        <p className="mt-4 max-w-2xl text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Uma requisição. O gateway escolhe o modelo.
        </p>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* source: harness */}
          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">harness</p>
            <p className="mt-2 font-mono text-sm text-foreground">seu editor</p>
            <div className="mt-4 border border-border bg-background p-3 font-mono text-xs text-muted-foreground">
              <span className="text-foreground/60" aria-hidden="true">
                {"POST "}
              </span>
              /v1/chat/completions
            </div>
          </div>

          {/* gateway node */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center border border-border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ny-anim-scan.svg" alt="Nylla gateway" className="pixel-crisp h-12 w-12" />
              <span className="flow-pulse pointer-events-none absolute inset-0 border border-foreground/30" aria-hidden="true" />
            </div>
          </div>

          {/* targets: models */}
          <ul className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-2">
            {MODELS.map((m, i) => {
              const isActive = i === active
              return (
                <li
                  key={m}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-between gap-2 px-3 py-3 transition-colors duration-300 ${
                    isActive ? "bg-ultra text-white" : "bg-card text-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-xs">{m}</span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 ${isActive ? "bg-background" : "bg-muted-foreground/40"}`}
                    aria-hidden="true"
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
          Prioridade por custo, latência ou qualidade. Se um provedor falha, o Nylla reencaminha automaticamente sem
          mudar uma linha no seu código.
        </p>
      </div>
    </section>
  )
}
