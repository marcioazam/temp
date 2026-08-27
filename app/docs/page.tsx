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
          <nav aria-label="Seções da documentação" className="type-label sticky top-24 flex flex-col gap-2.5">
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
            <h1 className="type-title text-foreground">Documentação</h1>
            <p className="type-lead mt-4 max-w-xl text-muted-foreground">
              Tudo o que você precisa para conectar seu harness ao gateway Nylla.
            </p>

            <h2 className="type-eyebrow mt-12 text-foreground">
              <span className="mr-1 text-subtle-foreground" aria-hidden="true">
                {"#"}
              </span>
              quickstart
            </h2>
            <p className="type-body mt-4 max-w-xl text-muted-foreground">
              Instale o CLI e conecte sua ferramenta. O comando detecta o harness instalado e configura tudo
              automaticamente.
            </p>
            <div className="mt-4">
              <CopyCommand command="npx nylla connect" />
            </div>
            <div className="mt-6 border border-border bg-card">
              <div className="type-micro border-b border-border px-4 py-2.5 text-subtle-foreground">
                instalação global (opcional)
              </div>
              <pre className="type-code overflow-x-auto p-4 text-foreground">
                <code>{`npm install -g nylla
nylla login
nylla connect --harness claude-code`}</code>
              </pre>
            </div>
          </section>

          <section id="harnesses">
            <h2 className="type-eyebrow text-foreground">
              <span className="mr-1 text-subtle-foreground" aria-hidden="true">
                {"#"}
              </span>
              harnesses suportados
            </h2>
            <p className="type-body mt-4 max-w-xl text-muted-foreground">
              O flag <code className="type-code bg-muted px-1.5 py-0.5 text-foreground">--harness</code> aceita os
              seguintes valores:
            </p>
            <div className="mt-4 overflow-x-auto border border-border">
              <table className="type-label w-full">
                <thead>
                  <tr className="type-eyebrow border-b border-border bg-card text-left text-subtle-foreground">
                    <th className="px-4 py-3">harness</th>
                    <th className="px-4 py-3">valor</th>
                    <th className="px-4 py-3">status</th>
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
            <h2 className="type-eyebrow text-foreground">
              <span className="mr-1 text-subtle-foreground" aria-hidden="true">
                {"#"}
              </span>
              modelos
            </h2>
            <p className="type-body mt-4 max-w-xl text-muted-foreground">
              Liste os modelos disponíveis no seu plano e defina o modelo padrão do gateway:
            </p>
            <div className="mt-4 border border-border bg-card">
              <pre className="type-code overflow-x-auto p-4 text-foreground">
                <code>{`nylla models list
nylla models set-default anthropic/claude-sonnet

# modelos frontier consomem créditos de usage
nylla usage`}</code>
              </pre>
            </div>
          </section>

          <section id="config">
            <h2 className="type-eyebrow text-foreground">
              <span className="mr-1 text-subtle-foreground" aria-hidden="true">
                {"#"}
              </span>
              configuração
            </h2>
            <p className="type-body mt-4 max-w-xl text-muted-foreground">
              O arquivo <code className="type-code bg-muted px-1.5 py-0.5 text-foreground">nylla.json</code>{" "}
              controla o modelo padrão, roteamento e orçamento frontier:
            </p>
            <div className="mt-4 border border-border bg-card">
              <div className="type-label border-b border-border px-4 py-2.5 text-subtle-foreground">
                ~/.nylla/nylla.json
              </div>
              <pre className="type-code overflow-x-auto p-4 text-foreground">
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
