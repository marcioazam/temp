"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"

const harnesses = ["Claude Code", "Codex", "Cursor", "Hermes Agent", "VS Code", "OpenCode"]

export function NpmSection() {
  const [selectedHarness, setSelectedHarness] = useState(harnesses[0])

  return (
    <section>
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2 md:items-start md:px-9 md:py-24">
        <Reveal>
          <h2 className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">{"// "}</span>plug and play
          </h2>
          <p className="mt-4 max-w-lg text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Um pacote para conectar qualquer harness.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            O NPM do Nylla configura o harness que você já usa e aponta tudo para o Nylla Gateway. Selecione a ferramenta,
            informe a URL e cole sua chave. O restante fica por conta do CLI.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm text-muted-foreground">
            <li><span className="text-emerald-500" aria-hidden="true">+ </span>configuração guiada por harness</li>
            <li><span className="text-emerald-500" aria-hidden="true">+ </span>uma chave, todos os modelos</li>
            <li><span className="text-emerald-500" aria-hidden="true">+ </span>sem editar arquivos manualmente</li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="elev-window w-full overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.1),0_6px_12px_rgba(0,0,0,0.1),0_16px_32px_rgba(0,0,0,0.12)]">
            <div className="relative flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">npx nylla connect</span>
            </div>
            <div className="space-y-6 p-5 md:p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">01 · escolha seu harness</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {harnesses.map((harness) => (
                    <button
                      key={harness}
                      type="button"
                      onClick={() => setSelectedHarness(harness)}
                      aria-pressed={selectedHarness === harness}
                      className={`border px-3 py-2 text-left font-mono text-xs transition-colors ${
                        selectedHarness === harness
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {harness}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">02 · conecte ao gateway</p>
                <label className="block space-y-2">
                  <span className="font-mono text-xs text-muted-foreground">URL do Nylla Gateway</span>
                  <input
                    type="url"
                    defaultValue="https://api.nylla.ai/v1"
                    className="w-full border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/60"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="font-mono text-xs text-muted-foreground">Chave da API</span>
                  <input
                    type="password"
                    placeholder="nylla_••••••••••••"
                    className="w-full border border-border bg-background px-3 py-2.5 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/60"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-xs">
                <span className="text-muted-foreground">pronto para configurar {selectedHarness}</span>
                <span className="text-foreground/70" aria-hidden="true">→</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
