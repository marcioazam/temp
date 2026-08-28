"use client"

import { useState } from "react"

type Tab = {
  label: string
  code: string
}

type Props = {
  /** Single code snippet (ignored when tabs are provided) */
  code?: string
  /** Header label, e.g. a filename or "curl" */
  title?: string
  /** Multiple language tabs */
  tabs?: Tab[]
}

export function CodeBlock({ code, title, tabs }: Props) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const current = tabs ? tabs[active].code : (code ?? "")

  async function copy() {
    try {
      await navigator.clipboard.writeText(current)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border pr-1.5">
        {tabs ? (
          <div className="flex items-center" role="tablist" aria-label="Linguagem do exemplo">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`type-micro border-r border-border px-4 py-2.5 transition-colors ${
                  active === i ? "bg-muted text-foreground" : "text-subtle-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="type-micro px-4 py-2.5 text-subtle-foreground">{title ?? "código"}</div>
        )}
        <button
          type="button"
          onClick={copy}
          className="type-micro px-2.5 py-1.5 text-subtle-foreground transition-colors hover:text-foreground"
          aria-label="Copiar código"
        >
          {copied ? "copiado" : "copiar"}
        </button>
      </div>
      <pre className="type-code overflow-x-auto p-4 text-foreground">
        <code>{current}</code>
      </pre>
    </div>
  )
}
