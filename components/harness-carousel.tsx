"use client"

import { useEffect, useState } from "react"
import { CommandPaletteMock } from "@/components/command-palette-mock"
import { ClaudeCodeWindow } from "@/components/editor-mock"
import { HermesTerminalMock } from "@/components/hermes-terminal-mock"

const SLIDE_MS = 720

// Cada slide fica visível pelo tempo do próprio loop de animação interno.
const SLIDES = [
  { id: "vscode", label: "VS Code", duration: 4_500 },
  { id: "claude", label: "Claude Code", duration: 16_000 },
  { id: "hermes", label: "Hermes Agent", duration: 22_000 },
] as const

export function HarnessCarousel() {
  const [active, setActive] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [snap, setSnap] = useState(false)

  useEffect(() => {
    const advance = window.setTimeout(() => {
      setSnap(false)
      setExiting(active)
      setActive((current) => (current + 1) % SLIDES.length)
    }, SLIDES[active].duration)

    return () => window.clearTimeout(advance)
  }, [active])

  // Ao fim do deslize, a janela que saiu volta sem animação para a direita,
  // para que a próxima entrada aconteça sempre do mesmo lado.
  useEffect(() => {
    if (exiting === null) return

    const settle = window.setTimeout(() => {
      setSnap(true)
      setExiting(null)
    }, SLIDE_MS)

    return () => window.clearTimeout(settle)
  }, [exiting])

  useEffect(() => {
    if (!snap) return

    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setSnap(false))
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [snap])

  const goTo = (index: number) => {
    if (index === active) return
    setSnap(false)
    setExiting(active)
    setActive(index)
  }

  return (
    <div role="group" aria-roledescription="carrossel" aria-label="Harnesses conectados ao Nylla Gateway">
      {/* Sem overflow-hidden: qualquer recorte cortaria a sombra da janela.
          A troca de slides usa fade + deslize curto, então nada precisa ser mascarado. */}
      <div className="relative h-[390px] sm:h-[420px]">
        {SLIDES.map((slide, index) => {
          const position =
            index === active
              ? "translate-x-0 opacity-100"
              : index === exiting
                ? "-translate-x-6 opacity-0"
                : "translate-x-6 opacity-0"

          return (
            <div
              key={slide.id}
              className={`motion-reduce:transition-none! absolute inset-0 ${position} ${
                index === active ? "" : "pointer-events-none"
              }`}
              style={{
                transitionProperty: snap ? "none" : "transform, opacity",
                transitionDuration: `${SLIDE_MS}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-hidden={index !== active}
              aria-roledescription="slide"
              aria-label={slide.label}
            >
              {(index === active || index === exiting) ? (
                <div
                  className={`mx-auto h-full w-full max-w-lg ${
                    index === exiting
                      ? "[animation-play-state:paused!important] [&_*]:[animation-play-state:paused!important]"
                      : ""
                  }`}
                >
                  {slide.id === "vscode" ? (
                    <CommandPaletteMock />
                  ) : slide.id === "claude" ? (
                    <ClaudeCodeWindow />
                  ) : (
                    <div className="pointer-events-none h-full w-full select-none">
                      <HermesTerminalMock />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )
        })}
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
