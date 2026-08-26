"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import { HermesTerminalMock } from "@/components/hermes-terminal-mock"
import { RotorMark } from "@/components/logo"

function ClaudeMascot() {
  return (
    <img
      src="/images/claude-code-logo.svg"
      alt=""
      aria-hidden="true"
      className="h-9 w-9 shrink-0 md:h-12 md:w-12"
      draggable={false}
    />
  )
}

type Line =
  | { kind: "prompt" | "bullet" | "text"; text: string }
  | { kind: "slash"; text: string }
  | { kind: "tool"; text: string; result: string }
  | { kind: "spinner" }
  | { kind: "tree"; rows: string[] }

type Phase = { model: string; alias: string; lines: Line[] }

const PHASES: Phase[] = [
  {
    model: "KIMI K3",
    alias: "kimi-k3",
    lines: [
      { kind: "prompt", text: "Acabei de entrar no time. Pode me dar uma visão geral de como este codebase está estruturado e onde ficam os entry points?" },
      { kind: "bullet", text: "Vou explorar o codebase para te dar uma visão completa." },
      { kind: "tool", text: "Explore(Explore codebase structure)", result: "Done (17 tool uses · 38.0k tokens · 28s)" },
      { kind: "spinner" },
      { kind: "bullet", text: "TaskFlow API — Codebase Overview" },
      { kind: "text", text: "Bem-vindo ao time! Esta é uma REST API em Node.js/Express para gestão de tarefas com colaboração. A estrutura do projeto:" },
      {
        kind: "tree",
        rows: [
          "taskflow/",
          "├── src/",
          "│   ├── index.js          # Entry point — sobe o servidor",
          "│   ├── app.js            # Configuração do Express",
          "│   ├── auth/             # JWT & Passport",
        ],
      },
    ],
  },
  {
    model: "DeepSeek V4",
    alias: "deepseek-v4",
    lines: [
      { kind: "slash", text: "/model deepseek-v4" },
      { kind: "bullet", text: "Modelo alternado pelo Nylla Gateway → DeepSeek V4 · 18ms" },
      { kind: "prompt", text: "Onde a autenticação é validada? Aponte os riscos antes de eu mexer." },
      { kind: "bullet", text: "Vou rastrear o fluxo de sessão e listar os riscos." },
      { kind: "tool", text: 'Search(Grep "verifySession" · 42 arquivos)', result: "Done (9 tool uses · 21.4k tokens · 12s)" },
      { kind: "spinner" },
      { kind: "bullet", text: "Auth Flow — Findings" },
      { kind: "text", text: "A verificação de sessão acontece depois da leitura do payload, então dados do usuário são acessados antes da autorização." },
      {
        kind: "tree",
        rows: [
          "src/auth/",
          "├── verify.js             # confia no payload antes do JWT",
          "├── middleware.js         # ordem invertida na cadeia",
          "└── session.js            # ok — assinatura validada",
        ],
      },
    ],
  },
  {
    model: "GPT 5.6 SOL",
    alias: "gpt-5.6-sol",
    lines: [
      { kind: "slash", text: "/model gpt-5.6-sol" },
      { kind: "bullet", text: "Modelo alternado pelo Nylla Gateway → GPT 5.6 SOL · 16ms" },
      { kind: "prompt", text: "Aplique a correção segura e rode a suíte de testes." },
      { kind: "bullet", text: "Movendo a autorização para antes de qualquer acesso a dados." },
      { kind: "tool", text: "Edit(src/auth/verify.js, src/auth/middleware.js)", result: "Done (12 tool uses · 26.8k tokens · 19s)" },
      { kind: "spinner" },
      { kind: "bullet", text: "Patch aplicado — 3 arquivos" },
      { kind: "text", text: "Sessão verificada no servidor, entrada validada por schema e consultas restritas ao usuário autenticado." },
      {
        kind: "tree",
        rows: [
          "tests/",
          "├── auth.spec.js          # 24 passed",
          "├── tasks.spec.js         # 31 passed",
          "└── e2e/login.spec.js     # 8 passed",
        ],
      },
    ],
  },
]

const SESSION_LINES = PHASES.flatMap((phase) =>
  phase.lines.map((line) => ({ ...line, model: phase.model, alias: phase.alias })),
)

function TreeRow({ row }: { row: string }) {
  const [path, comment] = row.split("#")
  return (
    <span className="block whitespace-pre">
      <span className="text-[#c9c5be]">{path}</span>
      {comment ? <span className="text-[#6f6b65]">{`#${comment}`}</span> : null}
    </span>
  )
}

function TranscriptLine({ line, delay }: { line: Line; delay: number }) {
  const style = { "--delay": `${delay}ms` } as React.CSSProperties

  if (line.kind === "prompt" || line.kind === "slash") {
    const isUserMessage = line.kind === "prompt"

    return (
      <div
        className={`claude-line claude-line-prompt mt-3 flex gap-2 rounded-[3px] px-2 py-1 ${
          isUserMessage ? "bg-foreground text-background" : "bg-[#31302d]"
        }`}
        style={style}
      >
        <span className={isUserMessage ? "text-background/65" : "text-[#7c7871]"}>&gt;</span>
        <span className={isUserMessage ? "text-background" : "text-[#d97757]"}>{line.text}</span>
      </div>
    )
  }

  if (line.kind === "bullet") {
    return (
      <div className="claude-line mt-3 flex items-center gap-2" style={style}>
        <span className="block size-1 shrink-0 rounded-full bg-[#8d8981]" aria-hidden="true" />
        <span className="leading-5 text-[#dcd8d2]">{line.text}</span>
      </div>
    )
  }

  if (line.kind === "text") {
    return (
      <p className="claude-line mt-2 max-w-2xl pl-4 text-[#c9c5be]" style={style}>
        {line.text}
      </p>
    )
  }

  if (line.kind === "tool") {
    return (
      <div className="claude-line claude-line-tool mt-3" style={style}>
        <div className="flex gap-2">
          <span className="text-[#7faa73]">*</span>
          <span className="text-[#dcd8d2]">{line.text}</span>
        </div>
        <div className="mt-1 flex gap-2 pl-4 text-[#8d8981]">
          <span>L</span>
          <span>{line.result}</span>
        </div>
      </div>
    )
  }

  if (line.kind === "spinner") {
    return (
      <div className="claude-line mt-3 flex items-baseline gap-2" style={style}>
        <span className="claude-activity-mark inline-block w-[1ch] text-center text-[#d97757]" aria-hidden="true">*</span>
        <span className="text-[#d97757]">
          Clauding<span aria-hidden="true">.</span><span className="claude-dot-two" aria-hidden="true">.</span><span className="claude-dot-three" aria-hidden="true">.</span>
        </span>
        <span className="text-[#6f6b65]">(esc to interrupt)</span>
      </div>
    )
  }

  if (line.kind === "tree") {
    return (
      <div className="claude-line mt-3 pl-4" style={style}>
        {line.rows.map((row) => (
          <TreeRow key={row} row={row} />
        ))}
      </div>
    )
  }

  return null
}

function ClaudeCodeSession() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [draft, setDraft] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)
  const composerTextRef = useRef<HTMLSpanElement>(null)
  const currentModel = SESSION_LINES[Math.max(0, visibleCount - 1)]?.model ?? PHASES[0].model
  const visibleLines = useMemo(() => SESSION_LINES.slice(0, visibleCount), [visibleCount])
  const nextLine = SESSION_LINES[visibleCount]
  const isTyping = nextLine?.kind === "prompt" || nextLine?.kind === "slash"

  useEffect(() => {
    if (!nextLine) {
      const restart = window.setTimeout(() => {
        setVisibleCount(0)
        setDraft("")
      }, 4800)
      return () => window.clearTimeout(restart)
    }

    if (isTyping) {
      if (draft.length < nextLine.text.length) {
        const typing = window.setTimeout(() => {
          const step = draft.length % 5 === 0 ? 2 : 1
          setDraft(nextLine.text.slice(0, draft.length + step))
        }, 13 + ((draft.length * 8) % 16))
        return () => window.clearTimeout(typing)
      }
      const submit = window.setTimeout(() => {
        setVisibleCount((count) => count + 1)
        setDraft("")
      }, 460)
      return () => window.clearTimeout(submit)
    }

    const delayByKind: Record<Line["kind"], number> = {
      prompt: 700,
      slash: 610,
      bullet: 910,
      text: 1340,
      tool: 1610,
      spinner: 700,
      tree: 1700,
    }
    const reveal = window.setTimeout(() => setVisibleCount((count) => count + 1), delayByKind[nextLine.kind])
    return () => window.clearTimeout(reveal)
  }, [draft, isTyping, nextLine])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current
      if (!scroller) return
      const nextTop = Math.max(scroller.scrollTop, scroller.scrollHeight - scroller.clientHeight)
      scroller.scrollTop = nextTop
    })
    return () => window.cancelAnimationFrame(frame)
  }, [visibleCount])

  useEffect(() => {
    const composerText = composerTextRef.current
    if (!composerText) return
    composerText.scrollLeft = composerText.scrollWidth
  }, [draft])

  return (
    <div
      data-current-model={currentModel}
      className="flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-[#34322f] bg-[#080806] font-mono text-[8px] leading-[1.6] text-[#dcd8d2] shadow-[0_26px_60px_-18px_rgba(0,0,0,0.72),0_10px_24px_-12px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.4)] sm:text-[9px] md:text-[10px]"
    >
      <div className="relative flex h-7 shrink-0 items-center border-b border-[#34322f] bg-[#1f1e1b] px-2.5 shadow-[inset_0_1px_rgba(255,255,255,0.035)] md:h-9 md:px-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-sans text-[8px] font-medium tracking-[-0.01em] text-[#aaa69f] md:text-[10px]">Claude Code — taskflow</span>
      </div>
      <div ref={scrollerRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3 [scrollbar-color:#55524c_transparent] [scrollbar-width:thin] sm:px-6 sm:py-5 md:px-8 md:py-6">
        <div className="flex items-start gap-3">
          <ClaudeMascot />
          <div>
            <p className="font-semibold text-[#f2efe9]">Claude Code</p>
            <p className="text-[#a5a19a]">
              {currentModel} (1M Context) · Nylla Gateway
            </p>
            <p className="text-[#6f6b65]">/users/nylla/taskflow</p>
          </div>
        </div>

        <div>
          {visibleLines.map((line, i) =>
            line.kind === "spinner" && i !== visibleLines.length - 1 ? null : (
              <TranscriptLine key={`${line.alias}-${i}`} line={line} delay={0} />
            ),
          )}
        </div>
      </div>

      <div className="shrink-0 bg-[#080806] px-4 pb-3 sm:px-6 sm:pb-4 md:px-8 md:pb-5">
        <div className="border-y border-[#5b5852]/65">
          <div className="flex min-h-7 items-center gap-2 px-1 py-1 md:min-h-9">
            <span className="text-[#dcd8d2]">&gt;</span>
            <span
              ref={composerTextRef}
              className={`min-w-0 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${nextLine?.kind === "slash" ? "text-[#d97757]" : "text-[#dcd8d2]"}`}
            >
              {draft}
            </span>
            <span className="cursor-blink h-3 w-px shrink-0 bg-[#eeeae3] md:h-4" aria-hidden="true" />
            <span className="min-w-0 flex-1" aria-hidden="true" />
          </div>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3 px-1 pt-1.5 text-[7px] leading-none text-[#77736c] sm:text-[8px] md:text-[9px]">
          <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
            <span className="shrink-0">? for shortcuts</span>
            <span className="text-[#4f4c47]" aria-hidden="true">·</span>
            <span className="hidden max-w-32 truncate text-[#8d8981] sm:inline md:max-w-none">/users/nylla/taskflow</span>
            <span className="hidden text-[#4f4c47] sm:inline" aria-hidden="true">·</span>
            <span className="hidden text-[#aaa69f] sm:inline">main</span>
          </div>
          <div className="flex min-w-0 items-center justify-end gap-1.5 whitespace-nowrap">
<span className="inline-flex items-center gap-1 text-[#aaa69f]">
  <span className="relative top-px block size-1 shrink-0 rounded-full bg-[#7faa73] shadow-[0_0_5px_rgba(127,170,115,0.35)]" aria-hidden="true" />
  <span className="leading-none">Thinking on</span>
            </span>
            <span className="text-[#4f4c47]" aria-hidden="true">·</span>
            <span className="hidden text-[#8d8981] sm:inline">Nylla Gateway</span>
            <span className="hidden text-[#4f4c47] sm:inline" aria-hidden="true">·</span>
            <span className="max-w-24 truncate text-[#d97757] sm:max-w-none">{currentModel}</span>
            <span className="hidden text-[#4f4c47] md:inline" aria-hidden="true">·</span>
            <span className="hidden text-[#7faa73] md:inline">Connected · 16ms</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisitorClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const update = () => setNow(new Date())
    update()
    const delay = 60_000 - (Date.now() % 60_000)
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      update()
      interval = window.setInterval(update, 60_000)
    }, delay)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [])

  const locale = typeof navigator === "undefined" ? "pt-BR" : navigator.language
  const time = now ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(now) : "--:--"
  const date = now ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(now) : "--/--/----"

  return (
    <time dateTime={now?.toISOString()} className="min-w-[4.5rem] text-right font-sans text-[9px] tabular-nums leading-tight md:text-[10px]">
      <span className="block text-white/80">{time}</span>
      <span className="hidden text-white/50 sm:block">{date}</span>
    </time>
  )
}

type WeatherResponse = { current?: { temperature_2m: number; weather_code: number } }
const WEATHER_FALLBACKS = [
  { temperature: 18, label: "Parcialmente nublado" },
  { temperature: 21, label: "Céu limpo" },
  { temperature: 14, label: "Nublado" },
]
const fetchWeather = async (url: string): Promise<WeatherResponse> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Não foi possível carregar o clima")
  return response.json()
}
function weatherLabel(code: number) {
  if (code === 0) return "Céu limpo"
  if (code <= 3) return "Parcialmente nublado"
  if (code <= 48) return "Neblina"
  if (code <= 67 || (code >= 80 && code <= 82)) return "Chuva"
  if (code <= 86) return "Neve"
  return "Trovoadas"
}
function WeatherIcon({ label }: { label: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.35, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (label.includes("Chuva") || label.includes("Trovoadas")) return <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true"><path d="M5.2 11.2h7.1a2.7 2.7 0 0 0 .2-5.4 4 4 0 0 0-7.6 1.1 2.2 2.2 0 0 0 .3 4.3Z" {...common}/><path d="m6.5 13.2-.7 1.3m3.7-1.3-.7 1.3m3.7-1.3-.7 1.3" {...common}/></svg>
  if (label.includes("Neve")) return <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true"><path d="M5.2 10.7h7.1a2.7 2.7 0 0 0 .2-5.4 4 4 0 0 0-7.6 1.1 2.2 2.2 0 0 0 .3 4.3Z" {...common}/><path d="M6.3 13.5h.01m2.7 1h.01m2.7-1h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  if (label === "Céu limpo") return <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true"><circle cx="9" cy="9" r="3" {...common}/><path d="M9 2.2v1.4M9 14.4v1.4M2.2 9h1.4M14.4 9h1.4M4.2 4.2l1 1m7.6 7.6 1 1m0-9.6-1 1m-7.6 7.6-1 1" {...common}/></svg>
  return <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true"><path d="M11.8 5.2a3 3 0 1 0-5.7 1.4" {...common}/><path d="M5.1 12h7.5a2.8 2.8 0 0 0 .1-5.6 4.1 4.1 0 0 0-7.8 1.2A2.2 2.2 0 0 0 5.1 12Z" {...common} fill="#111216"/></svg>
}
function WeatherWidget() {
  const [fallback, setFallback] = useState(WEATHER_FALLBACKS[0])
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null)
  useEffect(() => {
    setFallback(WEATHER_FALLBACKS[Math.floor(Math.random() * WEATHER_FALLBACKS.length)])
    navigator.geolocation?.getCurrentPosition(({ coords: p }) => setCoords({ latitude: p.latitude, longitude: p.longitude }), () => undefined, { timeout: 8000, maximumAge: 900000 })
  }, [])
  const url = coords ? `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&temperature_unit=celsius` : null
  const { data } = useSWR(url, fetchWeather, { refreshInterval: 600000, revalidateOnFocus: false })
  const temperature = data?.current ? Math.round(data.current.temperature_2m) : fallback.temperature
  const label = data?.current ? weatherLabel(data.current.weather_code) : fallback.label
  return <span className="hidden items-center gap-1.5 text-[9px] tabular-nums text-white/70 sm:flex md:text-[10px]"><WeatherIcon label={label}/><span>{temperature}°</span></span>
}

function WindowsTaskbar() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-9 items-center border-t border-white/[0.06] bg-[#24262d]/95 px-2 font-sans text-white/70 backdrop-blur-xl md:h-11 md:px-4">
      <div className="absolute left-1/2 grid -translate-x-1/2 place-items-center" aria-hidden="true">
        <span className="grid h-7 w-8 place-items-center text-white/80 md:h-9 md:w-11">
          <RotorMark className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <WeatherWidget />
        <span className="hidden h-3 items-end gap-[2px] sm:flex" aria-hidden="true">
          <i className="h-1 w-[2px] bg-white/45" /><i className="h-1.5 w-[2px] bg-white/55" /><i className="h-2 w-[2px] bg-white/70" /><i className="h-2.5 w-[2px] bg-white/85" />
        </span>
        <span className="hidden h-2.5 w-4 rounded-[2px] border border-white/65 p-px sm:block" aria-hidden="true"><i className="block h-full w-2.5 rounded-[1px] bg-white/70" /></span>
        <VisitorClock />
      </div>
    </div>
  )
}

export function EditorMock() {
  return (
    <div
      className="pointer-events-none relative aspect-[16/10] select-none overflow-hidden rounded-xl border border-border"
      style={{ pointerEvents: "none", userSelect: "none" }}
      role="img"
      aria-label="Claude Code conectado ao Nylla Gateway alternando entre KIMI K3, DeepSeek V4 e GPT 5.6 SOL"
    >
      <img src="/images/desktop-wallpaper.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full select-none object-cover" />
      <WindowsTaskbar />
      <div className="absolute left-3 top-3 h-[58%] w-[68%] sm:left-4 sm:top-4 sm:h-[60%] sm:w-[64%] md:left-5 md:top-5 md:h-[62%] md:w-[60%]">
        <ClaudeCodeSession />
      </div>
      <div className="absolute bottom-11 right-3 z-10 h-[52%] w-[46%] sm:right-4 sm:h-[54%] sm:w-[44%] md:bottom-14 md:right-5 md:h-[56%] md:w-[42%]">
        <HermesTerminalMock />
      </div>
    </div>
  )
}
