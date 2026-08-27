"use client"

import { useEffect, useState } from "react"
import { CommandPaletteMock } from "@/components/command-palette-mock"
import { ClaudeCodeWindow } from "@/components/editor-mock"
import { HermesTerminalMock } from "@/components/hermes-terminal-mock"

const FADE_MS = 280

// Cada slide fica visível pelo tempo do próprio loop de animação interno.
const SLIDES = [
  { id: "vscode", label: "VS Code", duration: 7_500 },
  { id: "claude", label: "Claude Code", duration: 16_000 },
  { id: "hermes", label: "Hermes Agent", duration: 15_000 },
] as const

export function HarnessCarousel() {
  const [active, setActive] = useState(0)
  const [target, setTarget] = useState<number | null>(null)
  const [phase, setPhase] = useState<"entering" | "fadingIn" | "visible" | "exiting">("entering")

  useEffect(() => {
    if (phase !== "entering") return
    const frame = window.requestAnimationFrame(() => setPhase("fadingIn"))
    return () => window.cancelAnimationFrame(frame)
  }, [active, phase])

  useEffect(() => {
    if (phase !== "fadingIn") return
    const settled = window.setTimeout(() => setPhase("visible"), FADE_MS)
    return () => window.clearTimeout(settled)
  }, [phase])

  useEffect(() => {
    if (phase !== "visible") return
    const advance = window.setTimeout(() => {
      setTarget((active + 1) % SLIDES.length)
      setPhase("exiting")
    }, SLIDES[active].duration)
    return () => window.clearTimeout(advance)
  }, [active, phase])

  useEffect(() => {
    if (phase !== "exiting" || target === null) return
    const swap = window.setTimeout(() => {
      setActive(target)
      setTarget(null)
      setPhase("entering")
    }, FADE_MS)
    return () => window.clearTimeout(swap)
  }, [phase, target])

  const goTo = (index: number) => {
    if (index === active || phase === "exiting") return
    setTarget(index)
    setPhase("exiting")
  }

  return (
    <div role="group" aria-roledescription="carrossel" aria-label="Harnesses conectados ao Nylla Gateway">
      {/* Sem recorte para preservar a sombra macOS. O mock fica estático durante
          o fade e seu loop só começa quando a entrada termina por completo. */}
      <div className="relative h-[390px] sm:h-[420px]">
        <div
          key={SLIDES[active].id}
          className={`absolute inset-0 transition-[opacity,transform,filter] motion-reduce:transition-none ${
            phase === "visible" || phase === "fadingIn"
              ? "translate-y-0 opacity-100 blur-0"
              : phase === "entering"
                ? "translate-y-1 opacity-0 blur-[1px]"
                : "-translate-y-1 opacity-0 blur-[1px]"
          }`}
          style={{
            transitionDuration: `${FADE_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-roledescription="slide"
          aria-label={SLIDES[active].label}
        >
          <div className="mx-auto h-full w-full max-w-lg">
            {SLIDES[active].id === "vscode" ? (
              <CommandPaletteMock isRunning={phase === "visible"} />
            ) : SLIDES[active].id === "claude" ? (
              <ClaudeCodeWindow isRunning={phase === "visible"} />
            ) : (
              <div className="pointer-events-none h-full w-full select-none">
                <HermesTerminalMock isRunning={phase === "visible"} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 backdrop-blur">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Mostrar ${slide.label}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/60 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
