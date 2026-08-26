"use client"

import { useVisibleCycle } from "@/hooks/use-visible-cycle"

const RESULTS = [
  { name: "claude-code", meta: "harness · cli" },
  { name: "codex", meta: "harness · cli" },
  { name: "cursor", meta: "harness · ide" },
  { name: "vscode", meta: "harness · ide" },
  { name: "aermes-agent", meta: "harness · agent" },
]

const QUERY = "connect "

export function CommandPaletteMock() {
  const { ref, index: active } = useVisibleCycle(RESULTS.length, 1500)

  return (
    <div ref={ref} className="group/win elev-float vibrancy panel-in overflow-hidden rounded-[12px]">
      {/* search field */}
      <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3.5">
        <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
          ›
        </span>
        <span className="flex-1 font-mono text-sm text-foreground">
          {QUERY}
          <span className="cursor-blink inline-block h-4 w-1.5 translate-y-0.5 bg-foreground" aria-hidden="true" />
        </span>
        <kbd>esc</kbd>
      </div>

      {/* results */}
      <ul className="py-1.5" aria-label="Harnesses disponíveis">
        {RESULTS.map((item, i) => {
          const isActive = i === active
          return (
            <li key={item.name}>
              <div
                className={`flex items-center justify-between px-4 py-2.5 transition-colors duration-300 ${
                  isActive ? "bg-muted/70" : "bg-transparent"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-ultra" : "bg-muted-foreground/30"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden font-mono text-[11px] text-muted-foreground/70 sm:inline">{item.meta}</span>
                  {isActive && <kbd>enter</kbd>}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-border/70 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <kbd>↑</kbd>
          <kbd>↓</kbd>
          <span className="ml-1">navegar</span>
        </span>
        <span>12 harnesses</span>
      </div>
    </div>
  )
}
