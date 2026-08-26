"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { HermesCaduceus } from "@/components/hermes-caduceus"

const BANNER_HERMES = [
  "█  █ ████ ███  █   █ ████ ████",
  "█  █ █    █  █ ██ ██ █    █   ",
  "████ ███  ███  █ █ █ ███  ████",
  "█  █ █    █ █  █   █ █       █",
  "█  █ ████ █  █ █   █ ████ ████",
]

const BANNER_AGENT = [
  "████ ████ ████ █  █ █████",
  "█  █ █    █    ██ █   █  ",
  "████ █ ██ ███  █ ██   █  ",
  "█  █ █  █ █    █  █   █  ",
  "█  █ ████ ████ █  █   █  ",
]

const TOOLSETS: Array<[string, string]> = [
  ["browser:", "browser_back, browser_click, ..."],
  ["code_execution:", "execute_code"],
  ["cronjob:", "cronjob"],
  ["delegation:", "delegate_task"],
  ["file:", "patch, read_file, write_file"],
  ["gateway:", "route_model, list_models, ..."],
]

const SKILLSETS: Array<[string, string]> = [
  ["autonomous-ai-agents:", "claude-code, codex, hermes-agent"],
  ["devops:", "webhook-subscriptions"],
  ["github:", "codebase-inspection, github-auth..."],
  ["mcp:", "mcporter, native-mcp"],
  ["research:", "arxiv, blogwatcher, polymarket..."],
  ["software-development:", "code-review, plan, suba..."],
]

type Line =
  | { kind: "prompt" | "slash"; text: string }
  | { kind: "sys" | "out" | "ok"; text: string }
  | { kind: "spinner" }
  | { kind: "tool"; text: string; result: string }
  | { kind: "tree"; rows: string[] }

type Phase = { model: string; lines: Line[] }

const PHASES: Phase[] = [
  {
    model: "hermes-4-405b",
    lines: [
      { kind: "prompt", text: "quais skills posso usar pra revisar um PR?" },
      { kind: "spinner" },
      { kind: "tool", text: "Skill(github/codebase-inspection)", result: "Done (4 tool uses · 12.1k tokens · 6s)" },
      { kind: "out", text: "3 skills compatíveis: code-review, requesting-code-review, github-code-r..." },
    ],
  },
  {
    model: "deepseek-v4",
    lines: [
      { kind: "slash", text: "/model deepseek-v4" },
      { kind: "sys", text: "Nylla Gateway → deepseek-v4 · 18ms" },
      { kind: "prompt", text: "revise o PR #482 e rode a suíte de testes" },
      { kind: "spinner" },
      { kind: "tool", text: "Browser(github.com/nylla/taskflow/pull/482)", result: "Done (11 tool uses · 24.6k tokens · 14s)" },
      {
        kind: "tree",
        rows: [
          "pull/482/",
          "├── src/auth/verify.js     # 2 comentários",
          "├── src/auth/session.js    # ok",
          "└── tests/auth.spec.js     # 24 passed",
        ],
      },
      { kind: "ok", text: "PR revisado · 63 testes passaram · patch pronto" },
    ],
  },
]

const SESSION = PHASES.flatMap((phase) => phase.lines.map((line) => ({ ...line, model: phase.model })))

function TranscriptLine({ line }: { line: Line }) {
  if (line.kind === "prompt" || line.kind === "slash") {
    return (
      <div className="claude-line mt-2 flex gap-1.5">
        <span className="text-[#e8c547]">›</span>
        <span className={line.kind === "slash" ? "text-[#e8c547]" : "text-[#d6d3c4]"}>{line.text}</span>
      </div>
    )
  }

  if (line.kind === "sys") {
    return (
      <div className="claude-line mt-1.5 pl-3 text-[#8a8672]">
        <span className="text-[#e8c547]">::</span> {line.text}
      </div>
    )
  }

  if (line.kind === "out") {
    return <p className="claude-line mt-1.5 pl-3 text-[#c4c1b2]">{line.text}</p>
  }

  if (line.kind === "ok") {
    return (
      <div className="claude-line mt-2 flex gap-1.5 pl-3 text-[#a8c47a]">
        <span aria-hidden="true">✓</span>
        <span>{line.text}</span>
      </div>
    )
  }

  if (line.kind === "tool") {
    return (
      <div className="claude-line mt-2">
        <div className="flex gap-1.5">
          <span className="text-[#e8c547]">*</span>
          <span className="text-[#d6d3c4]">{line.text}</span>
        </div>
        <div className="mt-0.5 flex gap-1.5 pl-3 text-[#7d7a68]">
          <span aria-hidden="true">└</span>
          <span>{line.result}</span>
        </div>
      </div>
    )
  }

  if (line.kind === "spinner") {
    return (
      <div className="claude-line mt-2 flex items-baseline gap-1.5 pl-3">
        <span className="claude-activity-mark inline-block w-[1ch] text-center text-[#e8c547]" aria-hidden="true">
          *
        </span>
        <span className="text-[#e8c547]">
          Reasoning<span aria-hidden="true">.</span>
          <span className="claude-dot-two" aria-hidden="true">
            .
          </span>
          <span className="claude-dot-three" aria-hidden="true">
            .
          </span>
        </span>
        <span className="text-[#6d6a5a]">(esc to interrupt)</span>
      </div>
    )
  }

  if (line.kind === "tree") {
    return (
      <div className="claude-line mt-2 pl-3">
        {line.rows.map((row) => {
          const [path, comment] = row.split("#")
          return (
            <span key={row} className="block whitespace-pre">
              <span className="text-[#c4c1b2]">{path}</span>
              {comment ? <span className="text-[#6d6a5a]">{`#${comment}`}</span> : null}
            </span>
          )
        })}
      </div>
    )
  }

  return null
}

export function HermesTerminalMock() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [draft, setDraft] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)

  const visibleLines = useMemo(() => SESSION.slice(0, visibleCount), [visibleCount])
  const nextLine = SESSION[visibleCount]
  const isTyping = nextLine?.kind === "prompt" || nextLine?.kind === "slash"
  const currentModel = SESSION[Math.max(0, visibleCount - 1)]?.model ?? PHASES[0].model

  useEffect(() => {
    if (!nextLine) {
      const restart = window.setTimeout(() => {
        setVisibleCount(0)
        setDraft("")
      }, 5200)
      return () => window.clearTimeout(restart)
    }

    if (isTyping) {
      if (draft.length < nextLine.text.length) {
        const typing = window.setTimeout(() => {
          const step = draft.length % 5 === 0 ? 2 : 1
          setDraft(nextLine.text.slice(0, draft.length + step))
        }, 15 + ((draft.length * 7) % 14))
        return () => window.clearTimeout(typing)
      }
      const submit = window.setTimeout(() => {
        setVisibleCount((count) => count + 1)
        setDraft("")
      }, 440)
      return () => window.clearTimeout(submit)
    }

    const delayByKind: Record<Line["kind"], number> = {
      prompt: 700,
      slash: 600,
      sys: 780,
      out: 1280,
      ok: 1100,
      tool: 1520,
      spinner: 900,
      tree: 1560,
    }
    const reveal = window.setTimeout(() => setVisibleCount((count) => count + 1), delayByKind[nextLine.kind])
    return () => window.clearTimeout(reveal)
  }, [draft, isTyping, nextLine])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current
      if (!scroller) return
      scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight
    })
    return () => window.cancelAnimationFrame(frame)
  }, [visibleCount, draft])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-white/[0.07] bg-[#080806] font-mono text-[7px] leading-[1.55] text-[#d6d3c4] shadow-[0_24px_55px_-22px_rgba(0,0,0,0.72),0_10px_24px_-16px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.35)] ring-1 ring-black/20 sm:text-[8px] md:rounded-xl md:text-[9px]">
      <div className="relative flex h-7 shrink-0 items-center border-b border-black/25 bg-[#2b2a28] px-2.5 shadow-[inset_0_1px_rgba(255,255,255,0.035)] md:h-9 md:px-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[8px] font-medium tracking-[-0.01em] text-[#aaa69f] md:text-[10px]">
          Hermes Agent — /opt/hermes
        </span>
      </div>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto px-2.5 py-2 [scrollbar-color:#4a4636_transparent] [scrollbar-width:thin] sm:px-3 md:px-4 md:py-3"
      >
        <div className="text-[#f2d857]">
          {BANNER_HERMES.map((row, i) => (
            <span key={`h-${i}`} className="block whitespace-pre leading-[1.05]">
              {row}
            </span>
          ))}
          {BANNER_AGENT.map((row, i) => (
            <span key={`a-${i}`} className="block whitespace-pre leading-[1.05]">
              {row}
            </span>
          ))}
        </div>

        <div className="mt-2 flex justify-end text-[#e8c547]">Hermes Agent v0.6.0 (2026.3.30)</div>

        <div className="mt-1 flex gap-3 border border-[#5b5852]/65 p-2 md:gap-4 md:p-2.5">
          <div className="hidden shrink-0 flex-col items-center md:flex">
              <HermesCaduceus className="w-[104px] lg:w-[124px]" />
            <div className="mt-1.5 text-center">
              <p className="font-semibold text-[#e8c547]">
                {currentModel} <span className="font-normal text-[#8a8672]">· Nylla Gateway</span>
              </p>
              <p className="text-[#7d7a68]">/opt/hermes</p>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[#f2d857]">Available Tools</p>
            <div className="mt-0.5">
              {TOOLSETS.map(([label, value]) => (
                <p key={label} className="truncate">
                  <span className="text-[#8a8672]">{label}</span> <span className="text-[#e8c547]">{value}</span>
                </p>
              ))}
              <p className="text-[#6d6a5a]">(and 10 more toolsets...)</p>
            </div>

            <p className="mt-2 font-semibold text-[#f2d857]">Available Skills</p>
            <div className="mt-0.5">
              {SKILLSETS.map(([label, value]) => (
                <p key={label} className="truncate">
                  <span className="text-[#8a8672]">{label}</span> <span className="text-[#e8c547]">{value}</span>
                </p>
              ))}
              <p className="text-[#6d6a5a]">(and 14 more skillsets...)</p>
            </div>

            <p className="mt-2 font-semibold text-[#f2d857]">Profile: custom</p>
            <p className="text-[#8a8672]">
              30 tools · 70 skills · <span className="text-[#e8c547]">/help</span> for commands
            </p>
          </div>
        </div>

        <p className="mt-2 text-[#c4c1b2]">Welcome to Hermes Agent! Type your message or /help for commands.</p>

        <div>
          {visibleLines.map((line, i) =>
            line.kind === "spinner" && i !== visibleLines.length - 1 ? null : (
              <TranscriptLine key={`${line.kind}-${i}`} line={line} />
            ),
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-[#5b5852]/65 bg-[#0d0c07] px-2.5 py-1 sm:px-3 md:px-4">
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[#8a8672]">
          <span aria-hidden="true">⚡</span>
          <span className="font-semibold text-[#e8c547]">{currentModel}</span>
          <span className="text-[#4a4636]" aria-hidden="true">
            |
          </span>
          <span>ctx 34%</span>
          <span className="hidden text-[#4a4636] sm:inline" aria-hidden="true">
            |
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            [<span className="text-[#e8c547]">▓▓▓▓▓▓</span>
            <span className="text-[#3a382c]">▓▓▓▓▓▓▓▓</span>]
          </span>
          <span className="ml-auto text-[#a8c47a]">connected · 16ms</span>
        </div>
      </div>

      <div className="flex min-h-5 shrink-0 items-center gap-1.5 border-t border-[#5b5852]/65 bg-[#080806] px-2.5 py-1 sm:px-3 md:min-h-7 md:px-4">
        <span className="text-[#e8c547]">›</span>
        <span
          className={`min-w-0 flex-1 overflow-hidden whitespace-nowrap ${nextLine?.kind === "slash" ? "text-[#e8c547]" : "text-[#d6d3c4]"}`}
        >
          {draft}
        </span>
        <span className="cursor-blink h-2.5 w-1 shrink-0 bg-[#e8c547] md:h-3" aria-hidden="true" />
      </div>
    </div>
  )
}
