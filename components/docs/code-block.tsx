"use client"

import { useMemo, useState } from "react"

export type Lang = "json" | "bash" | "ts" | "python" | "text"

export type CodeTab = {
  label: string
  code: string
  lang?: Lang
}

type Props = {
  /** Single snippet (ignored when `tabs` is provided) */
  code?: string
  lang?: Lang
  /** Header label, e.g. a filename, status code or verb */
  title?: string
  /** Language tabs */
  tabs?: CodeTab[]
  /** Soft-wrap long lines instead of scrolling horizontally */
  wrap?: boolean
}

/* --------------------------------------------------------------------------
   Tokenizer mínimo : o suficiente para dar hierarquia ao código sem
   arrastar um highlighter completo para o bundle.
   Paleta restrita: âmbar para literais de texto, verde para números,
   neutros para o resto.
   -------------------------------------------------------------------------- */

type Token = { text: string; kind: keyof typeof KIND_CLASS | "plain" }

const KIND_CLASS = {
  string: "text-primary/90",
  key: "text-foreground",
  comment: "text-subtle-foreground",
  number: "text-term-success",
  keyword: "text-code-mid",
  variable: "text-foreground",
} as const

const STRING = String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\x60(?:[^\x60\\]|\\.)*\x60)`
const NUMBER = String.raw`(?<number>\b\d+(?:\.\d+)?\b)`
const VARIABLE = String.raw`(?<variable>\$\{?[A-Za-z_][A-Za-z0-9_]*\}?)`
const KEYWORD =
  String.raw`(?<keyword>\b(?:const|let|var|function|async|await|return|import|export|from|for|of|new|class|def|if|else|with|as|true|false|null|None|True|False|curl|npx)\b)`

function buildPattern(lang: Lang): RegExp {
  const alts: string[] = [STRING]
  if (lang === "ts") alts.push(String.raw`(?<comment>\/\/[^\n]*)`)
  if (lang === "python" || lang === "bash") alts.push(String.raw`(?<comment>#[^\n]*)`)
  if (lang === "bash") alts.push(VARIABLE)
  alts.push(NUMBER, KEYWORD)
  return new RegExp(alts.join("|"), "g")
}

function tokenize(code: string, lang: Lang): Token[] {
  if (lang === "text") return [{ text: code, kind: "plain" }]

  const re = buildPattern(lang)
  const tokens: Token[] = []
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(code)) !== null) {
    if (match.index > last) tokens.push({ text: code.slice(last, match.index), kind: "plain" })

    const groups = match.groups ?? {}
    let kind: Token["kind"] = "plain"
    for (const name of ["string", "comment", "number", "keyword", "variable"] as const) {
      if (groups[name] !== undefined) {
        kind = name
        break
      }
    }

    // Em JSON, uma string seguida de ":" é uma chave, não um valor.
    if (kind === "string" && lang === "json") {
      const rest = code.slice(match.index + match[0].length)
      if (/^\s*:/.test(rest)) kind = "key"
    }

    tokens.push({ text: match[0], kind })
    last = match.index + match[0].length
  }

  if (last < code.length) tokens.push({ text: code.slice(last), kind: "plain" })
  return tokens
}

export function CodeBlock({ code, lang, title, tabs, wrap = false }: Props) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const current = tabs ? tabs[active] : { code: code ?? "", lang, label: title }
  const currentLang: Lang = current.lang ?? "text"
  const tokens = useMemo(() => tokenize(current.code, currentLang), [current.code, currentLang])

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard indisponível
    }
  }

  return (
    <div className="border border-border/60 bg-secondary">
      <div className="flex items-stretch justify-between border-b border-border/60">
        {tabs ? (
          <div className="docs-scrollbar flex items-stretch overflow-x-auto" role="tablist" aria-label="Linguagem do exemplo">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`type-micro relative whitespace-nowrap px-4 py-2.5 transition-colors ${
                  active === i ? "text-foreground" : "text-subtle-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {active === i && (
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px bg-primary" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="type-micro flex items-center px-4 py-2.5 text-subtle-foreground">{title ?? "código"}</div>
        )}
        <button
          type="button"
          onClick={copy}
          className="type-micro shrink-0 px-3.5 text-subtle-foreground transition-colors hover:text-foreground"
          aria-label="Copiar código"
        >
          {copied ? "copiado" : "copiar"}
        </button>
      </div>
      <pre
        className={`docs-scrollbar type-code max-h-[26rem] overflow-auto p-4 text-code-fg ${
          wrap ? "whitespace-pre-wrap break-words" : ""
        }`}
      >
        <code>
          {tokens.map((token, i) =>
            token.kind === "plain" ? (
              token.text
            ) : (
              <span key={i} className={KIND_CLASS[token.kind]}>
                {token.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  )
}
