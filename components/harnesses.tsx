import Link from "next/link"

import { CommandPaletteMock } from "@/components/command-palette-mock"
import { Reveal } from "@/components/reveal"

const harnesses = [
  { name: "Claude Code", status: "estável" },
  { name: "Codex", status: "estável" },
  { name: "Cursor", status: "estável" },
  { name: "VS Code", status: "estável" },
  { name: "Aermes Agent", status: "estável" },
  { name: "Zed", status: "estável" },
  { name: "OpenCode", status: "estável" },
  { name: "Cline", status: "estável" },
  { name: "Windsurf", status: "estável" },
  { name: "JetBrains", status: "beta" },
  { name: "Neovim", status: "beta" },
  { name: "API / SDK", status: "estável" },
]

export function Harnesses() {
  return (
    <section id="harnesses" className="border-b border-border">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-9 md:py-24">
        <h2 className="font-mono text-xs text-muted-foreground">
          <span aria-hidden="true">{"// "}</span>harnesses
        </h2>
        <div className="mt-4 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-balance font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Conecta em qualquer ferramenta que você já usa.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Conecte o Nylla às ferramentas que já fazem parte do seu fluxo. Um único gateway reúne os melhores
              modelos, aplica fallback automático e mantém cada agente trabalhando sem interrupções no editor, no
              terminal ou via SDK.
            </p>
            <Link
              href="#planos"
              className="mt-8 inline-flex items-center justify-center bg-[#F4F3F1] px-5 py-2.5 font-mono text-sm font-medium text-[#090909] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F3F1] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Assinar
            </Link>
          </div>

          <Reveal delay={80}>
            <CommandPaletteMock />
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-4">
          {harnesses.map((h, i) => (
            <Reveal
              as="li"
              key={h.name}
              delay={i * 45}
              className="group relative flex items-center justify-between gap-2 border-b border-r border-border bg-card px-4 py-4 transition-colors duration-300 hover:bg-muted"
            >
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 transition-colors duration-300 ${
                    h.status === "beta" ? "bg-border group-hover:bg-muted-foreground" : "bg-ultra/50 group-hover:bg-ultra"
                  }`}
                />
                <span className="font-mono text-sm text-foreground">{h.name}</span>
              </span>
              <span
                className={`font-mono text-[10px] uppercase transition-opacity duration-300 ${
                  h.status === "beta" ? "text-muted-foreground" : "text-foreground/50 group-hover:text-foreground/80"
                }`}
              >
                {h.status}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
