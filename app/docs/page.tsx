import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CopyCommand } from "@/components/copy-command"

export const metadata: Metadata = {
  title: "Docs | Nylla",
  description: "Documentação do Nylla: instalação, configuração de harnesses e uso do gateway de LLM.",
}

const sections = [
  { id: "quickstart", label: "quickstart" },
  { id: "harnesses", label: "harnesses" },
  { id: "modelos", label: "modelos" },
  { id: "config", label: "configuração" },
]

export default function DocsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-12 md:px-6 md:py-16">
        <aside className="hidden w-40 shrink-0 md:block">
          <nav aria-label="Seções da documentação" className="sticky top-24 space-y-2 font-mono text-xs">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-16">
          <section id="quickstart">
            <h1 className="font-mono text-2xl font-medium tracking-tight text-foreground">Documentação</h1>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Tudo o que você precisa para conectar seu harness ao gateway Nylla.
            </p>

            <h2 className="mt-10 font-mono text-sm text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">
                {"# "}
              </span>
              quickstart
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Instale o CLI e conecte sua ferramenta. O comando detecta o harness instalado e configura tudo
              automaticamente.
            </p>
            <div className="mt-4">
              <CopyCommand command="npx nylla connect" />
            </div>
            <div className="mt-6 border border-border bg-card">
              <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
                instalação global (opcional)
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                <code>{`npm install -g nylla
nylla login
nylla connect --harness claude-code`}</code>
              </pre>
            </div>
          </section>

          <section id="harnesses">
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">
                {"# "}
              </span>
              harnesses suportados
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              O flag <code className="bg-muted px-1 py-0.5 font-mono text-xs text-foreground">--harness</code> aceita os
              seguintes valores:
            </p>
            <div className="mt-4 overflow-x-auto border border-border">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-card text-left text-muted-foreground">
                    <th className="px-4 py-2 font-normal">harness</th>
                    <th className="px-4 py-2 font-normal">valor</th>
                    <th className="px-4 py-2 font-normal">status</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  {[
                    ["Claude Code", "claude-code", "estável"],
                    ["Codex", "codex", "estável"],
                    ["Cursor", "cursor", "estável"],
                    ["VS Code", "vscode", "estável"],
                    ["Aermes Agent", "aermes", "estável"],
                    ["Zed", "zed", "estável"],
                    ["OpenCode", "opencode", "estável"],
                    ["Cline", "cline", "estável"],
                    ["Windsurf", "windsurf", "estável"],
                    ["JetBrains", "jetbrains", "beta"],
                    ["Neovim", "nvim", "beta"],
                  ].map(([name, value, status]) => (
                    <tr key={value} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-2">{name}</td>
                      <td className="px-4 py-2 text-muted-foreground">{value}</td>
                      <td className="px-4 py-2 text-muted-foreground">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="modelos">
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">
                {"# "}
              </span>
              modelos
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Liste os modelos disponíveis no seu plano e defina o modelo padrão do gateway:
            </p>
            <div className="mt-4 border border-border bg-card">
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                <code>{`nylla models list
nylla models set-default anthropic/claude-sonnet

# modelos frontier consomem créditos de usage
nylla usage`}</code>
              </pre>
            </div>
          </section>

          <section id="config">
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">
                {"# "}
              </span>
              configuração
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              O arquivo <code className="bg-muted px-1 py-0.5 font-mono text-xs text-foreground">nylla.json</code>{" "}
              controla o modelo padrão, roteamento e orçamento frontier:
            </p>
            <div className="mt-4 border border-border bg-card">
              <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
                ~/.nylla/nylla.json
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                <code>{`{
  "defaultModel": "anthropic/claude-sonnet",
  "routing": {
    "strategy": "latency"
  },
  "frontier": {
    "enabled": true,
    "monthlyBudget": "auto"
  }
}`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
