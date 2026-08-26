import { Reveal } from "@/components/reveal"

const termLines = [
  { text: "$ npx nylla connect", dim: false },
  { text: "", dim: false },
  { text: "  detectando harness...        claude-code [ok]", dim: true },
  { text: "  gerando configuração...      ok", dim: true },
  { text: "  validando gateway...         ok", dim: true },
  { text: "", dim: false },
  { text: "  conectado → gateway.nylla.dev", dim: false },
  { text: "", dim: false },
  { text: "  modelos disponíveis: 47", dim: true },
  { text: "  latência: 38ms", dim: true },
]

export function NpmSection() {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-9 md:py-24">
        <Reveal>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">{"// "}</span>pacote npm
          </h2>
          <p className="mt-4 text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Um comando. Gateway conectado.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            O CLI detecta o harness instalado, gera a configuração e aponta a ferramenta para o gateway. Sem editar
            arquivos de config na mão, sem gerenciar chaves de provedor.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm text-muted-foreground">
            <li>
              <span className="text-foreground/60" aria-hidden="true">
                +{" "}
              </span>
              detecção automática do harness
            </li>
            <li>
              <span className="text-foreground/60" aria-hidden="true">
                +{" "}
              </span>
              uma única chave para todos os modelos
            </li>
            <li>
              <span className="text-foreground/60" aria-hidden="true">
                +{" "}
              </span>
              troca de modelo sem reconfigurar
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="elev-window overflow-hidden rounded-xl border border-border bg-card">
            {/* macOS titlebar */}
            <div className="relative flex items-center border-b border-border bg-muted/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] text-muted-foreground">
                Nylla · zsh
              </span>
            </div>
            <pre className="term-pane overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground md:p-6 md:text-sm">
              <code>
                {termLines.map((line, i) => (
                  <span
                    key={i}
                    className={`term-line block ${line.dim ? "text-muted-foreground" : "text-foreground"}`}
                    style={{ "--line": i } as React.CSSProperties}
                  >
                    {line.text || "\u00A0"}
                  </span>
                ))}
                <span
                  className="term-line block"
                  style={{ "--line": termLines.length } as React.CSSProperties}
                >
                  {"$ "}
                  <span
                    className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground"
                    aria-hidden="true"
                  />
                </span>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
