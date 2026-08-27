"use client"

import { useEffect, useState } from "react"

import { useVisibleCycle } from "@/hooks/use-visible-cycle"

type Session = {
  title: string
  meta: string
  status: "running" | "review" | "done"
}

const initialSessions: Session[] = [
  { title: "Migrar auth para o gateway", meta: "trabalhando...", status: "running" },
  { title: "Refatorar camada de streaming", meta: "trabalhando...", status: "running" },
  { title: "Adicionar retry com backoff", meta: "PR pronto", status: "review" },
  { title: "Tipar respostas do SDK", meta: "aguardando CI", status: "review" },
  { title: "Configurar modelos por região", meta: "há 42m", status: "done" },
  { title: "Instrumentar métricas de latência", meta: "há 1h", status: "done" },
]

const columns: { key: Session["status"]; label: string }[] = [
  { key: "running", label: "Rodando" },
  { key: "review", label: "Em review" },
  { key: "done", label: "Concluído" },
]

export function AgentBoardMock() {
  const [sessions, setSessions] = useState(initialSessions)
  const [movedKey, setMovedKey] = useState<string | null>(null)

  // The board only advances while it is actually on screen, so scrolling past
  // it parks the timer instead of re-rendering the whole tree every 4.2s.
  const { ref, index: tick } = useVisibleCycle(1000, 4200)

  useEffect(() => {
    if (tick === 0) return

    setSessions((prev) => {
      const next = [...prev]
      // promote the oldest running -> review, one review -> done, recycle a done -> running
      const runningIdx = next.findIndex((s) => s.status === "running")
      const reviewIdx = next.findIndex((s) => s.status === "review")
      const doneIdx = next.map((s) => s.status).lastIndexOf("done")

      if (runningIdx !== -1 && reviewIdx !== -1 && doneIdx !== -1) {
        const recycled = next[doneIdx]
        next[doneIdx] = { ...next[runningIdx], meta: "PR pronto", status: "review" }
        next[runningIdx] = { ...recycled, meta: "trabalhando...", status: "running" }
        next[reviewIdx] = { ...next[reviewIdx], meta: "agora", status: "done" }
        setMovedKey(next[doneIdx].title)
      }
      return next
    })
  }, [tick])

  return (
    <div ref={ref} className="win term-pane">
      {/* macOS titlebar */}
      <div className="win-bar">
        <div className="win-dots" aria-hidden="true">
          <span className="win-dot win-dot--close" />
          <span className="win-dot win-dot--min" />
          <span className="win-dot win-dot--max" />
        </div>
        <span className="win-title">Nylla · sessões de agents</span>
        <span className="ml-auto font-sans text-[9px] font-medium tracking-[-0.005em] text-muted-foreground md:text-[10px]">
          6 agents
        </span>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        {columns.map((col) => {
          const items = sessions.filter((s) => s.status === col.key)
          return (
            <div key={col.key} className="bg-card p-3">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {col.label}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60">{items.length}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((s) => (
                  <li
                    key={s.title}
                    className={`rounded-lg border border-border bg-background p-3 ${
                      movedKey === s.title ? "card-in" : ""
                    }`}
                  >
                    <p className="text-pretty font-mono text-xs leading-snug text-foreground">{s.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {s.status === "running" ? (
                        <span
                          aria-hidden="true"
                          className="status-pulse h-1.5 w-1.5 rounded-full bg-ultra"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            s.status === "review" ? "bg-muted-foreground" : "bg-muted-foreground/40"
                          }`}
                        />
                      )}
                      <span className="font-mono text-[10px] text-muted-foreground">{s.meta}</span>
                    </div>
                    {s.status === "running" && (
                      <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                        <div className="progress-slide h-full w-1/3 bg-ultra/70" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
