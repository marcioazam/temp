"use client"

import { useState } from "react"

const RUNNERS = [
  { id: "npm", prefix: "npx" },
  { id: "pnpm", prefix: "pnpm dlx" },
  { id: "bun", prefix: "bunx" },
] as const

type Props = {
  /** Command without the runner prefix, e.g. "nylla connect" */
  command: string
  /** Show the macOS-style segmented runner switcher */
  runners?: boolean
}

export function CopyCommand({ command, runners = true }: Props) {
  const [runner, setRunner] = useState<(typeof RUNNERS)[number]["id"]>("npm")
  const [copied, setCopied] = useState(false)

  const base = command.replace(/^(npx|pnpm dlx|bunx)\s+/, "")
  const prefix = RUNNERS.find((r) => r.id === runner)!.prefix
  const full = `${prefix} ${base}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(full)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="inline-flex flex-col gap-2">
      {runners && (
        <div
          className="inline-flex w-fit items-center gap-0.5 rounded-[7px] border border-border bg-muted/50 p-0.5"
          role="tablist"
          aria-label="Gerenciador de pacotes"
        >
          {RUNNERS.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={runner === r.id}
              onClick={() => setRunner(r.id)}
              className={`rounded-[5px] px-2.5 py-1 font-mono text-[11px] transition-all duration-200 ${
                runner === r.id
                  ? "bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.id}
            </button>
          ))}
        </div>
      )}

      <div className="group inline-flex h-11 items-center gap-3 rounded-[8px] border border-border bg-card pl-4 pr-1.5 transition-colors hover:border-muted-foreground/40">
        <span className="select-none font-mono text-sm text-muted-foreground/60" aria-hidden="true">
          $
        </span>
        <span className="font-mono text-sm text-foreground">{full}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-1 rounded-[6px] px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
          aria-label={`Copiar comando ${full}`}
        >
          {copied ? "copiado" : "copiar"}
        </button>
      </div>
    </div>
  )
}
